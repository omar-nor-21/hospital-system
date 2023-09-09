import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ToasterState {
    message: string;
    setMessage: (value: string) => void;

    show: boolean;
    setShow: (value: boolean) => void;
}

const useToasterStore = create<ToasterState>()(
    devtools(
        (set) => ({
            message: "",
            setMessage: (value) => set({ message: value }),

            show: false,
            setShow: (value) => set({ show: value }),
        }),
        {
            name: "toaster-storage",
        }
    )
);

export default useToasterStore;
