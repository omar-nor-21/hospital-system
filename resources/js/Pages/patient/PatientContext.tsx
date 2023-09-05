import { PropsWithChildren, createContext, useContext, useState } from "react";

type PatientContextProps = {
    show: boolean,
    setShow: (value: boolean) => void,

    isUpdateMode: boolean,
    setIsUpdateMode: (value: boolean) => void,

    updateId: string | undefined,
    setUpdateId: (value: string) => void,
}
const PatientContext = createContext<PatientContextProps>({
    show: false,
    setShow: (value: boolean) => { },
    isUpdateMode: false,
    setIsUpdateMode: (value: boolean) => { },
    updateId: undefined,
    setUpdateId: (value: string) => { }
});

export const usePatientContext = () => {
    return useContext(PatientContext);
}

const PatientProvider = ({ children }: PropsWithChildren) => {
    const [show, setShow] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState('');

    return (
        <PatientContext.Provider value={{ show, setShow, isUpdateMode, setIsUpdateMode, updateId, setUpdateId }}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientProvider