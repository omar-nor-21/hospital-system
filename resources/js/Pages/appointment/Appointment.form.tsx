import Modal from "@/components/forms/Modal";
import { FormEvent, useEffect, useState } from "react";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PageProps } from '@/types';
import { FormEventHandler } from 'react';
import { usePatientContext } from "./PatientContext";
import { PatientProps } from "../patient/Patient.form";

export type AppointmentProps = {
    id?: string,
    patient_id: string,
    doctor_id: string,
    fee: string,
    date: string,
    priority: string,
    status: string,
}

export default function AppointmentForm() {

    const patients = usePage<PageProps<{ patients: PatientProps[] }>>().props.patients;

    const doctors = usePage<PageProps<{ doctors: DoctorProps[] }>>().props.doctors;

    console.log(patients)

    const ctx = usePatientContext()
    const { data, setData, post, processing, errors, reset } = useForm<AppointmentProps>({
        patient_id: "",
        doctor_id: "",
        fee: "",
        date: "",
        priority: "",
        status: "",
    });
    const defaultDate = new Date();
    const [dob] = useState(defaultDate);

    const closeModal = () => {
        ctx?.setShow(false);
        reset()
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("patient.store"));
        ctx.setIsUpdateMode(true);
    };

    const appointments = usePage<PageProps<{ appointments: AppointmentProps[] }>>().props.appointments;

    // is update mode
    useEffect(() => {
        if (ctx.isUpdateMode) {
            const found = appointments.find((appointment) => appointment.id === ctx.updateId);
            if (found) setData(found)
        }
    }, [ctx.isUpdateMode, ctx.updateId])

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
                        <InputLabel className="mb-2" htmlFor="name" value="Customer Name" />
                        <select
                            name="customer_id"
                            onChange={(e) => setData('patient_id', e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Choose a customer</option>
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
                            value="doctor Name"
                        />

                        <TextInput
                            name="doctor"
                            value={data.doctor}
                            onChange={(e) =>
                                setData("doctor", e.target.value)
                            }
                            className="w-full"
                            placeholder="name"
                        />

                        <InputError
                            message={errors.guardian}
                            className="mt-2"
                        />
                    </div>

                </div>
                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Sex
                        </label>
                        <select
                            name="gender"
                            onChange={(e) => setData("gender", e.target.value)}
                            defaultValue={data.gender}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>select sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mt-6 w-full ">
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Marital status
                        </label>
                        <select
                            name="marital status"
                            onChange={(e) => setData("marital_status", e.target.value)}
                            defaultValue={data.marital_status}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>select marital status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                        </select>
                        <InputError
                            message={errors.marital_status}
                            className="mt-2"
                        />
                    </div>

                </div>
                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="dob"
                            value="Date of birth"
                        />
                        <input
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            type="date"
                            defaultValue={dob.toLocaleDateString("en-CA")}
                            onChange={(e) => setData("dob", e.target.value)}
                        />

                        <InputError message={errors.dob} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full ">
                        <label
                            htmlFor="blood group"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Blood Group
                        </label>
                        <select
                            name="blood_group"
                            onChange={(e) => setData("blood_group", e.target.value)}
                            defaultValue={data.blood_group}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>select blood group</option>
                            <option value="a">A</option>
                            <option value="a+">A+</option>
                            <option value="a-">A-</option>
                            <option value="b+">B+</option>
                            <option value="b-">B-</option>
                            <option value="ab+">AB+</option>
                            <option value="ab+">AB-</option>
                            <option value="o+">O+</option>
                            <option value="o-">O+</option>
                        </select>
                        <InputError
                            message={errors.blood_group}
                            className="mt-2"
                        />
                    </div>

                </div>
                <div className="flex space-x-4">

                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="phone"
                            value="Patient Phone"
                        />

                        <TextInput
                            name="phone"
                            type="number"
                            value={data.patient_phone}
                            onChange={(e) => setData("patient_phone", e.target.value)}
                            className="w-full"
                            placeholder="number"
                        />

                        <InputError message={errors.patient_phone} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="guardian_phone"
                            value="Guardian Phone"
                        />

                        <TextInput
                            name="guardian_phone"
                            type="number"
                            value={data.guardian_phone}
                            onChange={(e) =>
                                setData("guardian_phone", e.target.value)
                            }
                            className="w-full"
                            placeholder="number"
                        />

                        <InputError
                            message={errors.patient_phone}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="address"
                            value="address"
                        />

                        <TextInput
                            name="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full"
                            placeholder="address"
                        />

                        <InputError message={errors.address} className="mt-2" />
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