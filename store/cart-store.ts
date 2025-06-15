import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name:string;
    quantity: number;
    price: number;
    imageUrl:string |null
}
 

interface CartStore {
    items: CartItem[];
    addItem:(item:CartItem)=>void
    removeItem:(item:CartItem)=>void
    clearCart:()=>void
}
//make a cart store
export const useCartStore =create<CartStore>()(
    persist((set)=>({
    items:[] , 
    addItem:(item) =>set((state)=>{
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        }
        return {
          items: [...state.items, { ...item}],
        };
    }), 
    removeItem:(item)=>set((state)=>{
              const existingItem = state.items.find((i) => i.id === item.id);
              if (existingItem && existingItem.quantity > 1) {
                return {
                  items: state.items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
                  ),
                };
              }
              return {
                items: state.items.filter((i) => i.id !== item.id),
              };

    }) , 
    clearCart:()=>set({
      items:[]
    })
}),{name:'cart-store'}))