"use client";
import Stripe from "stripe";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

const ProductCard = ({ product }: { product: Stripe.Product }) => {
  const price = product.default_price as Stripe.Price;
  const { addItem } = useCartStore();
  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };
  return (
    <div>
      {" "}
      <Card className="flex flex-col justify-between w-[350px] max-sm:w-[300px] p-0 h-auto shadow-sm shadow-blue-400 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-3 hover:shadow-xl">
        <div className=" justify-center flex items-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={250}
            height={250}
            className="w-auto h-[260px] object-cover rounded-2xl"
            priority
          />
        </div>
        <CardTitle className="text-xl font-bold px-3">{product.name}</CardTitle>
        <CardContent>
          <CardDescription className="text-sm font-semibold text-gray-700 ">
            {product && product.description}
          </CardDescription>
          {price && price.unit_amount && (
            <p className=" mt-2 font-bold">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </CardContent>
        <div className="flex items-center justify- w-full  ">
          <Link
            href={`/products/${product.id}`}
            className="w-full bg-teal-500 text-white font-semibold border-inherit text-center rounded-bl-xl flex-1/2 py-2 transition-all duration-300 hover:bg-teal-500/80  "
          >
            Show Details
          </Link>
          <p
            className="flex-1/2 font-bold text-center rounded-br-xl py-2 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            onClick={onAddItem}
          >
            Add To Cart
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
