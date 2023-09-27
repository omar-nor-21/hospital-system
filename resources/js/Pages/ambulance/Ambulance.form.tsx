import Modal from "@/components/forms/Modal";
import React, { useEffect, useState } from "react";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { FormEventHandler } from 'react';
import { useFormContext } from "../../context/PageFormContext";
import useToasterStore from "@/store/toaster";
import { PageProps } from "@/types";
import moment from "moment";

export type AmbulanceProps = {
    id?: string,
    driver_license: string,
    driver_name: string,
    driver_phone: string,
    vehicle_model: string,
    vehicle_type: string,
    vehicle_year_made: string,
    note: string,


}
export default function DoctorForm() {
    const { data, setData, post, processing, errors, reset, patch } = useForm<AmbulanceProps>({
        driver_name: "",
        driver_license: "",
        driver_phone: "",
        vehicle_model: "",
        vehicle_type: "",
        vehicle_year_made: "",
        note: "",
    });

    const ambulances = usePage<PageProps<{ ambulances: AmbulanceProps[] }>>().props.ambulances;

    const ctx = useFormContext();

    const { setShow, setMessage } = useToasterStore(state => state)

    const closeModal = () => {
        ctx.setShow(false);
        setTimeout(() => {
            ctx.setIsUpdateMode(false);
            reset();
        }, 200)

    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (ctx.isUpdateMode !== true) {
            post(route("ambulance.store"), {
                onSuccess: (value) => {
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
            patch(route("ambulance.update", data.id), {
                onSuccess: (value) => {
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
        const found = ambulances.find((ambulance) => ambulance.id === ctx.updateId);
        if (found) setData(found)
    }, [ctx.updateId, ctx.isUpdateMode,])


    return (
        <Modal show={ctx.show} onClose={closeModal} maxWidth="3xl" >
            <form className="p-6" onSubmit={submit} >
                {/* header modal */}
                <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
                    <h2 className="text-xl font-medium  text-gray-900">
                        {ctx.isUpdateMode ? "Update Ambulance" : "New Ambulance"}
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

                <div className="grid grid-cols-2 gap-x-4 mb-1">
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="driver_name"
                            value="Driver Name"
                        />

                        <TextInput
                            name="driver_name"
                            value={data.driver_name}
                            onChange={(e) => setData("driver_name", e.target.value)}
                            className="w-full"
                            placeholder="driver name"
                        />

                        <InputError message={errors.driver_name} className="mt-2" />
                    </div>

                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="driver_license"
                            value="Driver license"
                        />

                        <TextInput
                            name="driver_license"
                            value={data.driver_license}
                            onChange={(e) =>
                                setData("driver_license", e.target.value)
                            }
                            className="w-full"
                            placeholder="driver license"
                        />

                        <InputError
                            message={errors.driver_license}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 mb-1">
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="driver_phone"
                            value="Drive Contact"
                        />

                        <TextInput
                            name="driver_phone"
                            value={data.driver_phone}
                            onChange={(e) =>
                                setData("driver_phone", e.target.value)
                            }
                            className="w-full"
                            placeholder="Driver Phone"
                        />

                        <InputError
                            message={errors.driver_phone}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="vehicle_model"
                            value="Vehicle Model"
                        />

                        <TextInput
                            name="vehicle_model"
                            value={data.vehicle_model}
                            onChange={(e) =>
                                setData("vehicle_model", e.target.value)
                            }
                            className="w-full"
                            placeholder="Vehicle Model"
                        />

                        <InputError
                            message={errors.vehicle_model}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 mb-1">
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="vehicle_type"
                            value="Vehicle Model"
                        />

                        <TextInput
                            name="vehicle_type"
                            value={data.vehicle_type}
                            onChange={(e) =>
                                setData("vehicle_type", e.target.value)
                            }
                            className="w-full"
                            placeholder="Vehicle Type"
                        />

                        <InputError
                            message={errors.vehicle_type}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="vehicle_year_made"
                            value="Vehicle Year Made"
                        />

                        <TextInput
                            name="vehicle_year_made"
                            value={data.vehicle_year_made}
                            onChange={(e) =>
                                setData("vehicle_year_made", e.target.value)
                            }
                            className="w-full"
                            placeholder="Vehicle Year Made"
                        />

                        <InputError
                            message={errors.vehicle_year_made}
                            className="mt-2"
                        />
                    </div>

                </div>
                <div className="mt-6 w-full ">
                    <InputLabel
                        className="mb-2"
                        htmlFor="note"
                        value="note"
                    />

                    <TextInput
                        name="note"
                        value={data.note}
                        onChange={(e) =>
                            setData("note", e.target.value)
                        }
                        className="w-full"
                        placeholder="note"
                    />

                    <InputError
                        message={errors.note}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton className="ml-3" disabled={processing}>
                        {ctx.isUpdateMode ? "Update" : "Submit"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}