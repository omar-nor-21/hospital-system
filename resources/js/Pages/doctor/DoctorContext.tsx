import { createContext, useContext, useState } from "react";

const DoctorContext = createContext;

export const useDoctorContext = () => {
    return useContext(DoctorContext)
}

export const DoctorProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState("");
    return (
        { children }
    )
} 