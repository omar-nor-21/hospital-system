import { PropsWithChildren, createContext, useState } from "react"

type PageFormContextProps = {
    show: boolean,
    setShow: (value: boolean) => void,

    isUpdateMode: boolean,
    setIsUpdateMode: (value: boolean) => void,

    updateId: string | undefined,
    setUpdateId: (value: string) => void,
}

export const FormContext = createContext<PageFormContextProps | null>({
    show: false,

    
    setShow: (value: boolean) => { },
    isUpdateMode: false,
    setIsUpdateMode: (value: boolean) => { },
    updateId: undefined,
    setUpdateId: (value: string) => { },
})

const FormProvider = ({ children }: PropsWithChildren) => {
    const [show, setShow] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [updateId, setUpdateId] = useState('');
    return (
        <FormContext.Provider value={{ show, setShow, isUpdateMode, setIsUpdateMode, updateId, setUpdateId }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider