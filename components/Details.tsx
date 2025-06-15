"use client";
import Stripe from "stripe";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

const Details = ({ product }: { product: Stripe.Product }) => {
  const { addItem, items, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const quantity = items.find((i) => i.id == product.id)?.quantity || 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };
  const onRemoveItem = () => {
    removeItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };
  return (
    <div className="flex justify-center items-center space-x-15  flex-wrap">
      <div>
        <Image
          src={product.images[0]}
          alt="hero Image"
          width={300}
          height={300}
          className="rounded-2xl w-auto h-[400px]"
          priority
        />
      </div>
      <div className="flex flex-col justify-between gap-3 items-center font-bold">
        <h1 className="text-2xl">{product.name}</h1>
        <p>${price.unit_amount! / 100}</p>
        <p className="text-sm font-medium text-gray-400">
          {product.description && product.description}
        </p>
        <div className="flex gap-3 items-center flex-wrap">
          <Button variant={"default"} onClick={onAddItem} name="add">
            +
          </Button>
          <p>{quantity}</p>
          <Button
            className="bg-white border-1-black text-black shadow hover:bg-white "
            onClick={onRemoveItem}
            name="remove"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
