import { useAvailableDoctors } from "@/hooks/use-doctors";
import DoctorAvatar from "./DoctorAvatar";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  return (
    <div className="flex items-center gap-4">
      <DoctorAvatar
        name={doctor.name}
        gender={doctor.gender}
        imageUrl={doctor.imageUrl}
        size={48}
        className="w-12 h-12"
      />
      <div>
        <h3 className="font-medium">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">
          {doctor.speciality || "General Dentistry"}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;
