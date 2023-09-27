import Modal from "@/components/forms/Modal";
import { FormEventHandler, useEffect, useState } from "react";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PageProps } from '@/types';
import { useFormContext } from "../../context/PageFormContext";
import Toast from "@/components/ui/Toast";
import { PatientProps } from "../patient/Patient.form";
import { MedicineProps } from "../medicine/Medicine.form";
import useToasterStore from "@/store/toaster";

export type PharmacyProps = {
    id?: string,
    patient_id: string,
    medicine_id: string,
    price: string,
    quantity: string,
    medicine_name?: string,
    expire_date?: string,
    patients?: PatientProps,
    medicines?: MedicineProps
}
export default function PharmacyForm() {
    const ctx = useFormContext()

    const medicines = usePage<PageProps<{ medicines: MedicineProps[] }>>().props.medicines;

    const pharmacies = usePage<PageProps<{ pharmacies: PharmacyProps[] }>>().props.pharmacies;

    const patients = usePage<PageProps<{ patients: PatientProps[] }>>().props.patients;

    const { setShow, setMessage } = useToasterStore(state => state);

    const { data, setData, post, processing, errors, reset, patch } = useForm<PharmacyProps>({
        patient_id: "",
        medicine_id: "",
        price: "",
        quantity: "",
    });


    const closeModal = () => {
        ctx.setShow(false);
        ctx.setIsUpdateMode(false);
        reset();
    };

    const submit: FormEventHandler = (e) => {
        if (ctx.isUpdateMode !== true) {
            post(route("pharmacy.store"), {
                onSuccess: (value) => {
                    console.log(value)
                    setMessage(value.props.message as string);
                    ctx.setShow(false)
                    setShow(true)
                },
                onError: (error) => {
                    console.log(error)
                },

            });

        }
        else {
            patch(route("pharmacy.update", data.id), {
                onSuccess: (value) => {
                    console.log(value)
                    setMessage(value.props.message as string);
                    ctx.setShow(false)
                    setShow(true)
                    reset();
                },
                onError: (error) => {
                    console.log(error)
                },

            });
        }

    };


    // is update mode
    useEffect(() => {
        if (ctx.isUpdateMode) {
            const found = pharmacies.find((pharmacy) => pharmacy.id === ctx.updateId);
            if (found) setData(found)
        }
    }, [ctx.isUpdateMode, ctx.updateId])


    useEffect(() => {
        const medicine = medicines.find((d) => d.id == data.medicine_id);
        data.medicine_id !== "" ?
            setData(prv => ({ ...prv, medicine_name: medicine?.name, price: medicine?.sale as string })) :
            setData(prv => ({ ...prv, medicine_name: "", price: "" }))
    }, [data.medicine_id])


    return (
        <div className="">
            <Modal show={ctx.show} onClose={closeModal} maxWidth="2xl">
                <form className="p-6" onSubmit={submit} >
                    {/* header modal */}
                    <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
                        {
                            ctx.isUpdateMode === true ?
                                <h2 className="text-xl font-medium  text-gray-900">
                                    Update Medicine
                                </h2>
                                : <h2 className="text-xl font-medium  text-gray-900">
                                    New Pharmacy
                                </h2>
                        }
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

                        <div className="mt-6 w-full">
                            <InputLabel className="mb-2" htmlFor="name" value="Medicine Category" />
                            <select
                                name="medicine_id"
                                onChange={(e) => setData('medicine_id', e.target.value)}
                                defaultValue={data.medicine_id}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Select</option>
                                {medicines.map((medicine) => (
                                    <option value={medicine.id} key={medicine.id}>
                                        {medicine.category}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.medicine_id} className="mt-2" />
                        </div>
                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="medicine_name"
                                value="Medicine Name"
                            />
                            <TextInput
                                name="phone"
                                type="text"
                                value={data.medicine_name}
                                disabled
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4">

                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="sale"
                                value="Price"
                            />

                            <TextInput
                                name="phone"
                                type="text"
                                value={data.price}
                                onChange={(e) => setData("price", e.target.value)}
                                className="w-full"
                            />

                            <InputError message={errors.price} className="mt-2" />
                        </div>

                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="quantity"
                                value="Quantity"
                            />

                            <TextInput
                                name="quantity"
                                type="number"
                                value={data.quantity}
                                onChange={(e) => setData("quantity", e.target.value)}
                                className="w-full"
                                placeholder="number"
                            />

                            <InputError message={errors.quantity} className="mt-2" />
                        </div>

                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        {
                            ctx.isUpdateMode === true ?
                                <PrimaryButton className="ml-3" disabled={processing}>
                                    Update
                                </PrimaryButton>
                                :
                                <PrimaryButton className="ml-3" disabled={processing}>
                                    Submit
                                </PrimaryButton>
                        }
                    </div>
                </form>
            </Modal>
        </div>

    );
}