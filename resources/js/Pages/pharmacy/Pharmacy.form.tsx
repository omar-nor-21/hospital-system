import Modal from "@/components/forms/Modal";
import { FormEventHandler, useEffect, useState } from "react";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PageProps } from '@/types';
import { useFormContext } from "../PageFormContext";
import Toast from "@/components/ui/Toast";

export type MedicineProps = {
    id?: string,
    name: string,
    category: string,
    company: string,
    composition: string,
    group: string,
    tax: string,
    sale: string,
    quantity: string,
    note: string,
    expire_date: string,
}
export default function PharmacyForm() {
    const [showToast, setShowToast] = useState(false);
    const defaultDate = new Date();
    const [expire_date] = useState(defaultDate);

    const ctx = useFormContext()
    const { data, setData, post, processing, errors, reset } = useForm<MedicineProps>({
        name: "",
        category: "",
        company: "",
        composition: "",
        group: "",
        tax: "",
        sale: "",
        quantity: "",
        note: "",
        expire_date: "",
    });

    const closeModal = () => {
        ctx?.setShow(false);
        reset()
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("medicine.store"));
        reset()
        ctx.setIsUpdateMode(true);

        ctx?.setShow(false);

        setShowToast(true);

    };

    const medicines = usePage<PageProps<{ medicines: MedicineProps[] }>>().props.medicines;

    // toast timeout
    useEffect(() => {
        setTimeout(()=>{})
    }, [])

    // is update mode
    useEffect(() => {
        if (ctx.isUpdateMode) {
            const found = medicines.find((patient) => patient.id === ctx.updateId);
            if (found) setData(found)
        }
    }, [ctx.isUpdateMode, ctx.updateId])

    return (
        <div className="">
            {
                showToast && (

                    <Toast message="Medicine Created Successfully." />
                )
            }

            <Modal show={ctx.show} onClose={closeModal}>
                <form className="p-6" onSubmit={submit} >
                    {/* header modal */}
                    <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
                        {
                            ctx.isUpdateMode == true ?
                                <h2 className="text-xl font-medium  text-gray-900">
                                    Update Medicine
                                </h2>
                                : <h2 className="text-xl font-medium  text-gray-900">
                                    New Medicine
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
                            <InputLabel
                                className="mb-2"
                                htmlFor="name"
                                value="Name"
                            />

                            <TextInput
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full"
                                placeholder="name"
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="mt-6 w-full ">
                            <label
                                htmlFor="status"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                name="category"
                                onChange={(e) => setData("category", e.target.value)}
                                defaultValue={data.category}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option>Select a category</option>
                                <option value="syrub">Syrub</option>
                                <option value="capsule">Capsule</option>
                                <option value="injection">Injection</option>
                                <option value="ointment">Ointment</option>
                                <option value="cream">Cream</option>
                                <option value="liquid">Liquid</option>
                                <option value="tablet">Tablet</option>
                                <option value="drops">Drops</option>
                                <option value="surgical">Surgical</option>
                                <option value="inhales">Inhales</option>
                                <option value="preperations">Preperations</option>
                            </select>
                        </div>
                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="company"
                                value="Company"
                            />
                            <input
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                type="text"
                                onChange={(e) => setData("company", e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="composition"
                                value="Composition"
                            />
                            <input
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                type="text"
                                onChange={(e) => setData("composition", e.target.value)}
                            />

                        </div>

                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="group"
                                value="Group"
                            />
                            <input
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                type="text"
                                onChange={(e) => setData("group", e.target.value)}
                            />

                        </div>

                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="tax"
                                value="Tax"
                            />
                            <TextInput
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                type="text"
                                value={data.tax}
                                onChange={(e) => setData("tax", e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="flex space-x-4">

                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="sale"
                                value="Sale"
                            />

                            <TextInput
                                name="phone"
                                type="number"
                                value={data.sale}
                                onChange={(e) => setData("sale", e.target.value)}
                                className="w-full"
                                placeholder="number"
                            />

                            <InputError message={errors.sale} className="mt-2" />
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

                        <div className="mt-6 w-full">
                            <InputLabel
                                className="mb-2"
                                htmlFor="expire_date"
                                value="Expire Dte"
                            />
                            <input
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                type="date"
                                defaultValue={expire_date.toLocaleDateString("en-CA")}
                                onChange={(e) => setData("expire_date", e.target.value)}
                            />

                            <InputError message={errors.expire_date} className="mt-2" />
                        </div>

                    </div>
                    <div className="flex space-x-4">

                        <div className="mt-6 w-full ">
                            <InputLabel
                                className="mb-2"
                                htmlFor="note"
                                value="Note"
                            />

                            <TextInput
                                name="note"
                                type="text"
                                value={data.note}
                                onChange={(e) =>
                                    setData("note", e.target.value)
                                }
                                className="w-full"
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
        </div>

    );
}