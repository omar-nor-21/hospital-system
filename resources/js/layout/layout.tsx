import Toast from "@/components/ui/Toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {


    return (
        <div className="h-screen ">
            <Navbar />
            <div className="min-h-[93.5%] md:flex">
                <Sidebar />
                <div className="w-full px-5 py-6">
                    {children}

                </div>
            </div>
            <Toast />
        </div>
    );
}