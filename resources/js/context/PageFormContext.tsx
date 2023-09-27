import { PropsWithChildren, createContext, useContext, useState } from "react"

type PageFormContextProps = {
    show: boolean,
    setShow: (value: boolean) => void,

    isUpdateMode: boolean,
    setIsUpdateMode: (value: boolean) => void,

    updateId: string | undefined,
    setUpdateId: (value: string) => void,

    deleteId: string | undefined,
    setDeleteId: (value: string) => void,

    deleteConfirmModel: boolean,
    setDeleteConfirmModel: (value: boolean) => void,

}

const FormContext = createContext<PageFormContextProps>({
    show: false,
    setShow: (value: boolean) => { },
    isUpdateMode: false,
    setIsUpdateMode: (value: boolean) => { },
    updateId: undefined,
    setUpdateId: (value: string) => { },
    deleteId: undefined,
    setDeleteId: (value: string) => { },
    deleteConfirmModel: false,
    setDeleteConfirmModel: (value: boolean) => { },
})
export const useFormContext = () => {
    return useContext(FormContext);
}
const FormProvider = ({ children }: PropsWithChildren) => {
    const [show, setShow] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [deleteConfirmModel, setDeleteConfirmModel] = useState(false);
    return (
        <FormContext.Provider value={{ show, setShow, isUpdateMode, setIsUpdateMode, updateId, setUpdateId, deleteId, setDeleteId, deleteConfirmModel, setDeleteConfirmModel }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider