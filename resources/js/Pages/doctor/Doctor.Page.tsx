import Layout from "@/layout/layout";
import DoctorForm from "./Doctor.form";
import DoctorList from "./Doctor.list";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FormProvider, { useFormContext } from "../../context/PageFormContext";

function DoctorPage() {
    const ctx = useFormContext()

    return (
        <>
            <div className="flex justify-between mb-5 px-6" >
                <Breadcrumb name="doctor" />
                <div className="w-full  md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button onClick={() => ctx.setShow(true)} type="button" className="flex items-center justify-center bg-blue-600 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add doctor
                    </button>
                </div>
            </div>
            <DoctorList />
            <DoctorForm />
        </>


    );
}
export default () => {
    return (
        <FormProvider>
            <Layout>
                <DoctorPage />
            </Layout>
        </FormProvider>
    )

}