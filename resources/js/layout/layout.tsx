import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {PropsWithChildren} from "react";

export default function Layout({ children } : PropsWithChildren<{}>) {
    return (
        <div className="">
            <Navbar />
            <Sidebar />
            {children}
        </div>
    );
}