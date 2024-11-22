import { create } from "zustand";

const useCartModal = create((set ) => ({
    cartModalIsOpen: false,
    setCartModalIsOpen: (value) => set({ cartModalIsOpen: value }),
})
)

export default useCartModal