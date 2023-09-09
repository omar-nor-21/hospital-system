import Modal from "@/components/forms/Modal";
import { FormEvent, useEffect, useState } from "react";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PageProps } from '@/types';
import { PatientProps } from "../patient/Patient.form";
import { DoctorProps } from "../doctor/Doctor.form";
import { useFormContext } from "../PageFormContext";

export type AppointmentProps = {
    id?: string,
    patient_id: string,
    doctor_id: string,
    appointment_date: string,
    priority: string,
    status: string,
    fee?: string,
    doctors?: DoctorProps,
    patients?: PatientProps,

}

export default function AppointmentForm() {

    const patients = usePage<PageProps<{ patients: PatientProps[] }>>().props.patients;
    const doctors = usePage<PageProps<{ doctors: DoctorProps[] }>>().props.doctors;
    const appointments = usePage<PageProps<{ appointments: AppointmentProps[] }>>().props.appointments;
    const ctx = useFormContext()
    const defaultDate = new Date();
    const [dob] = useState(defaultDate);
    const { data, setData, post, processing, errors, reset } = useForm<AppointmentProps>({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        priority: "",
        status: "",
    });


    const closeModal = () => {
        ctx?.setShow(false);
        reset()
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("appointment.store"));
        ctx.setIsUpdateMode(true);
    };

    // is update mode
    useEffect(() => {
        if (ctx.isUpdateMode) {
            const found = appointments.find((appointment) => appointment.id === ctx.updateId);
            if (found) setData(found)
        }
    }, [ctx.isUpdateMode, ctx.updateId])

    // doctor fee
    useEffect(() => {
        if (data.doctor_id !== "") {
            const doctor = doctors.find((d) => d.id == data.doctor_id);
            setData('fee', doctor?.fee);
        }
        else {
            setData('fee', "")
        }
    }, [data.doctor_id])

    return (
        <Modal show={ctx.show} onClose={closeModal}>
            <form className="p-6" onSubmit={submit} >
                {/* header modal */}
                <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
                    <h2 className="text-xl font-medium  text-gray-900">
                        New Appointment
                    </h2>

                    <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* modal body */}
                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <InputLabel className="mb-2" htmlFor="name" value="Patient Name" />
                        <select
                            name="patient_id"
                            onChange={(e) => setData('patient_id', e.target.value)}
                            defaultValue={data.patient_id}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select a patient</option>
                            {patients.map((patient) => (
                                <option value={patient.id} key={patient.id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.patient_id} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="doctor"
                            value="Doctor Name"
                        />

                        <select
                            name="doctor_id"
                            onChange={(e) => setData('doctor_id', e.target.value)}
                            defaultValue={data.doctor_id}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map((doctor) => (
                                <option value={doctor.id} key={doctor.id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.doctor_id} className="mt-2" />
                    </div>

                </div>

                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="date"
                            value="Appointment date"
                        />
                        <input
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            type="date"
                            defaultValue={dob.toLocaleDateString("en-CA")}
                            onChange={(e) => setData("appointment_date", e.target.value)}
                        />

                        <InputError message={errors.appointment_date} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="phone"
                            value="Doctor fee"
                        />

                        <TextInput
                            name="phone"
                            type="number"
                            disabled
                            value={data.fee}
                            onChange={(e) => setData('fee', e.target.value)}
                            className="w-full"
                        />

                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Priority
                        </label>
                        <select
                            name="priority"
                            onChange={(e) => setData("priority", e.target.value)}
                            defaultValue={data.priority}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                            <option value="very urgent">Very Urgent</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="mt-6 w-full ">
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Status
                        </label>
                        <select
                            name="status"
                            onChange={(e) => setData("status", e.target.value)}
                            defaultValue={data.status}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>Select a status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="cancel">Cancel</option>
                        </select>
                        <InputError
                            message={errors.status}
                            className="mt-2"
                        />
                    </div>

                </div>


                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton className="ml-3" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}