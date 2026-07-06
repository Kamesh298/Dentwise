import {
  useDeleteAppointments,
  useGetAppointments,
  useUpdateAppointmentStatus,
} from "@/hooks/use-appointment";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

function RecentAppointments() {
  const { data: appointments = [] } = useGetAppointments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();
  const deleteAppointmentsMutation = useDeleteAppointments();
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState<
    string[]
  >([]);

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);

    const newStatus =
      appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";

    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);

    if (!appointment || appointment.status !== "COMPLETED") {
      toast.error("Only completed appointments can be deleted.");
      return;
    }

    if (window.confirm("Delete this completed appointment?")) {
      deleteAppointmentsMutation.mutate(
        { ids: [appointmentId] },
        {
          onSuccess: () => {
            toast.success("Appointment deleted successfully.");
            setSelectedAppointmentIds((current) =>
              current.filter((id) => id !== appointmentId),
            );
          },
          onError: () => {
            toast.error("Failed to delete appointment.");
          },
        },
      );
    }
  };

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  );

  const toggleAppointmentSelection = (appointmentId: string) => {
    setSelectedAppointmentIds((current) => {
      if (current.includes(appointmentId)) {
        return current.filter((id) => id !== appointmentId);
      }

      return [...current, appointmentId];
    });
  };

  const toggleSelectAllCompleted = () => {
    const completedIds = completedAppointments.map(
      (appointment) => appointment.id,
    );
    const allSelected = completedIds.every((id) =>
      selectedAppointmentIds.includes(id),
    );

    setSelectedAppointmentIds((current) => {
      if (allSelected) {
        return current.filter((id) => !completedIds.includes(id));
      }

      return Array.from(new Set([...current, ...completedIds]));
    });
  };

  const handleDeleteSelected = () => {
    if (selectedAppointmentIds.length === 0) {
      toast.error("Select at least one completed appointment to delete.");
      return;
    }

    const selectedCompletedIds = selectedAppointmentIds.filter((id) =>
      appointments.some(
        (appointment) =>
          appointment.id === id && appointment.status === "COMPLETED",
      ),
    );

    if (selectedCompletedIds.length === 0) {
      toast.error("Only completed appointments can be deleted.");
      return;
    }

    if (
      window.confirm(
        `Delete ${selectedCompletedIds.length} selected completed appointment(s)?`,
      )
    ) {
      deleteAppointmentsMutation.mutate(
        { ids: selectedCompletedIds },
        {
          onSuccess: () => {
            toast.success("Selected appointments deleted successfully.");
            setSelectedAppointmentIds([]);
          },
          onError: () => {
            toast.error("Failed to delete selected appointments.");
          },
        },
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Appointments
        </CardTitle>
        <CardDescription>
          Monitor and manage all patient appointments
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Select completed appointments and delete them in bulk.
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
            disabled={
              selectedAppointmentIds.length === 0 ||
              deleteAppointmentsMutation.isPending
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
            {selectedAppointmentIds.length > 0 && (
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {selectedAppointmentIds.length}
              </span>
            )}
          </Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      completedAppointments.length > 0 &&
                      completedAppointments.every((appointment) =>
                        selectedAppointmentIds.includes(appointment.id),
                      )
                    }
                    onCheckedChange={toggleSelectAllCompleted}
                    aria-label="Select all completed appointments"
                  />
                </TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedAppointmentIds.includes(appointment.id)}
                      onCheckedChange={() =>
                        toggleAppointmentSelection(appointment.id)
                      }
                      disabled={
                        appointment.status !== "COMPLETED" ||
                        deleteAppointmentsMutation.isPending
                      }
                      aria-label={`Select ${appointment.patientName}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.patientEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {appointment.doctorName}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {new Date(appointment.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleToggleAppointmentStatus(appointment.id)
                      }
                      className="h-6 px-2"
                    >
                      {getStatusBadge(appointment.status)}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {appointment.status === "COMPLETED" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                          disabled={deleteAppointmentsMutation.isPending}
                          className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      )}
                      <div className="text-xs text-muted-foreground">
                        Click status to toggle
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentAppointments;
