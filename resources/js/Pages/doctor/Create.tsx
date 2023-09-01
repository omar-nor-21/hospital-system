import Modal from "@/components/forms/Modal";
import React, { useState } from "react";
import Layout from "@/layout/layout";
import InputLabel from "@/components/forms/InputLabel";
import InputError from "@/components/forms/InputError";
import TextInput from "@/components/forms/TextInput";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";


export default function Create({ show, setShow }: {show: boolean, setShow:boolean}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name:"",
        father_name:"",
        mother_name : "",
        phone:"",
        sex:"",
        blood_group:"",
        marital_status:"",
        dob:"",
        doj:"",
        photo:"",
        emergency_contact:"",
        email:"",
        qualification:"",
        work_experience:"",
        specialization:"",
        
    });
    const defaultDate = new Date();
    const [dob] = useState(defaultDate);
    const [doj] = useState(defaultDate);

    const closeModal = () => {
        setShow(false);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("doctor.store"));
        reset();
    };
    return (
        <Modal show={show} onClose={closeModal}>
            <form className="p-6" onSubmit={submit} >
                {/* header modal */}
                <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
                    <h2 className="text-xl font-medium  text-gray-900">
                        New Doctor
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
                        <InputLabel
                            className="mb-2"
                            htmlFor="father_name"
                            value="Father Name"
                        />

                        <TextInput
                            name="father_name"
                            value={data.father_name}
                            onChange={(e) =>
                                setData("father_name", e.target.value)
                            }
                            className="w-full"
                            placeholder="name"
                        />

                        <InputError
                            message={errors.father_name}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="father_name"
                            value="Mother Name"
                        />

                        <TextInput
                            name="mother_name"
                            value={data.phone}
                            onChange={(e) =>
                                setData("mother_name", e.target.value)
                            }
                            className="w-full"
                            placeholder="name"
                        />

                        <InputError
                            message={errors.mother_name}
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
                            name="status"
                            onChange={(e) => setData("sex", e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>select sex</option>
                            <option value="male">Male</option>
                            <option value="female">FeMale</option>
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
                            onChange={(e) =>
                                setData("marital_status", e.target.value)
                            }
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option>select marital status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                        </select>
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
                            onChange={(e) =>
                                setData("blood_group", e.target.value)
                            }
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
                        <InputLabel
                            className="mb-2"
                            htmlFor="doj"
                            value="Date of joining"
                        />
                        <input
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            type="date"
                            defaultValue={doj.toLocaleDateString("en-CA")}
                            onChange={(e) => setData("doj", e.target.value)}
                        />

                        <InputError message={errors.doj} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="photo"
                            value="Photo"
                        />

                        <TextInput
                            name="photo"
                            value={data.photo}
                            type="file"
                            onChange={(e) => setData("photo", e.target.value)}
                            className="w-full"
                        />

                        <InputError message={errors.photo} className="mt-2" />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="phone"
                            value="Phone"
                        />

                        <TextInput
                            name="phone"
                            type="number"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full"
                            placeholder="phone"
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="emergency_contact"
                            value="Emergency Contact"
                        />

                        <TextInput
                            name="emergency_contact"
                            type="number"
                            value={data.emergency_contact}
                            onChange={(e) =>
                                setData("emergency_contact", e.target.value)
                            }
                            className="w-full"
                            placeholder="number"
                        />

                        <InputError
                            message={errors.emergency_contact}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="email"
                            value="email"
                        />

                        <TextInput
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full"
                            placeholder="name"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="mt-6 w-full">
                        <InputLabel
                            className="mb-2"
                            htmlFor="qualification"
                            value="Qualification"
                        />

                        <TextInput
                            name="qualification"
                            value={data.qualification}
                            onChange={(e) =>
                                setData("qualification", e.target.value)
                            }
                            className="w-full"
                            placeholder="qualification"
                        />

                        <InputError
                            message={errors.qualification}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="experience"
                            value="Work Experience"
                        />

                        <TextInput
                            name="work_experience"
                            value={data.work_experience}
                            onChange={(e) =>
                                setData("work_experience", e.target.value)
                            }
                            className="w-full"
                            placeholder="Experience"
                        />

                        <InputError
                            message={errors.work_experience}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-6 w-full ">
                        <InputLabel
                            className="mb-2"
                            htmlFor="specialization"
                            value="Specialization"
                        />

                        <TextInput
                            name="specialization"
                            value={data.specialization}
                            onChange={(e) =>
                                setData("specialization", e.target.value)
                            }
                            className="w-full"
                            placeholder="name"
                        />

                        <InputError
                            message={errors.specialization}
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