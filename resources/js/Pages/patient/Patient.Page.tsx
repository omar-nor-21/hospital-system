import Layout from "@/layout/layout";
import React, { useState } from "react";
import Form from "./Patient.form";
import PrimaryButton from "@/components/ui/PrimaryButton";
import List from "./Patient.list";
import Breadcrumb from "@/layout/Breadcrumb";

export default function PatientPage() {
    const [show, setShow] = useState(false);

    const handleModel = () => {
        setShow(true);
    };

    return (
        <Layout>
            <div className="flex justify-between mb-5 px-6" >
                <Breadcrumb name="Patient"/>

                <div className="w-full  md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button onClick={handleModel} type="button" className="flex items-center justify-center bg-red-600 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add patient
                    </button>
                </div>
            </div>
            <List />
            <Form show={show} setShow={setShow} />
        </Layout>
    );
}