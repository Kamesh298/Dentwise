"use client";

import { createDoctor, getDoctors } from "@/lib/actions/doctors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "domain";

export function useGetDoctors() {
    const result = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });

  return result;
}


export function useCreateDoctors() {
 const result = useMutation({
  mutationFn: createDoctor,
  onSuccess: () => console.log("Doctor created successfully"),
  onError: (error) => console.error("Error while creating a doctor:"),
 })

 return result;
}