import Modal from "@/components/forms/Modal";
import { FormEvent, useEffect, useState } from "react";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { PageProps } from '@/types';
import { useFormContext } from "@/context/PageFormContext";
import useToasterStore from "@/store/toaster";
import moment from "moment";

export type IncomeProps = {
    id?: string,
    invoice_number: string,
    description: string,
    date: string,
    income_head: string,
    amount: string,
    name: string,

}

export default function IncomeForm() {

    const incomes = usePage<PageProps<{ incomes: IncomeProps[] }>>().props.incomes;

    const ctx = useFormContext()

    const { setShow, setMessage } = useToasterStore(state => state)

    const { data, setData, post, processing, errors, reset, patch } = useForm<IncomeProps>({
        invoice_number: "",
        description: "",
        date: moment().format('YYYY-MM-DD'),
        income_head: "",
        amount: "",
        name: "",
    });


    const closeModal = () => {
        ctx?.setShow(false);
        ctx.setIsUpdateMode(false)
        reset();

    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (ctx.isUpdateMode !== true) {
            post(route("income.store"), {
                onSuccess: (value) => {
                    setMessage(value.props.message as string)
                    setShow(true)
                    ctx.setShow(false)
                    reset();
                },
                onError: (error) => {
                    console.log(error)
                }
            });

        }
        else {
            patch(route('income.update', data.id), {
                onSuccess: (value) => {
                    setMessage(value.props.message as string)
                    ctx.setShow(false)
                    setShow(true)
                    reset();
                },
                onError: (error) => {
                    console.log(error)
                }
            })
        }
    };

    // is update mode
    useEffect(() => {
        if (ctx.isUpdateMode) {
            const found = incomes.find((income) => income.id === ctx.updateId);
            if (found) setData(found)
        }
    }, [ctx.isUpdateMode, ctx.updateId])



    return (
        <Modal show={ctx.show} onClose={closeModal}>
            <form className="p-6" onSubmit={submit} >
                {/* header modal */}
                <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
                    <h2 className="text-xl font-medium  text-gray-900">
                        {ctx.isUpdateMode ? "Update Income" : "New Income"}
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
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* modal body */}
                <div className="flex space-x-4">

                    <div className="mt-6 w-full">
                        <InputLabel className="mb-2" htmlFor="income_head" value="Income Head" />
                        <select
                            name="income_head"
                            onChange={(e) => setData('income_head', e.target.value)}
                            defaultValue={data.income_head}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select income head</option>
                            <option value="Hospital Charges">Hospital Charges</option>
                            <option value="Special Campaign">Special Campaign</option>
                            <option value="Canteen Rent">Canteen Rent</option>
                            <option value="Vehicle Stand Charges">Vehicle Stand Charges</option>
                        </select>
                        <InputError message={errors.income_head} className="mt-2" />
                    </div>

                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="name"
                            value="Name"
                        />

                        <TextInput
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="invoice_number"
                            value="Invoice Number"
                        />

                        <TextInput
                            name="name"
                            type="text"
                            value={data.invoice_number}
                            onChange={(e) => setData('invoice_number', e.target.value)}
                            className="w-full"
                        />
                    </div>

                </div>

                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="date"
                            value="Income date"
                        />
                        <input
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            type="date"
                            defaultValue={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                        />

                        <InputError message={errors.date} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="amount"
                            value="Amount ($)"
                        />

                        <TextInput
                            name="phone"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.amount} className="mt-2" />

                    </div>
                </div>
                <div className="mt-6 w-full">
                    <InputLabel
                        className="mb-2"
                        htmlFor="description"
                        value="Description"
                    />

                    <TextInput
                        name="phone"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full"
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