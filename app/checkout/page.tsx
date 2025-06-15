"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { checkOutActions } from "./checkout";

const CheckoutPage = () => {
  const { items, addItem, removeItem } = useCartStore();
  console.log(items);
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price / 100) * item.quantity,
    0
  );

  const totalAmount = items.reduce((acc, item) => acc + item.quantity, 0);
  if (totalPrice === 0 || items.length === 0)
    return (
      <div className="text-3xl font-bold text-center text-red-500">
        Your Cart is empty
      </div>
    );
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-evenly items-center  mb-4">
        <h1 className="text-4xl font-bold text-blue-500">Check out</h1>
      </div>
      <Card>
        <CardTitle className="text-2xl font-semibold px-20 underline max-sm:text-lg">
          Order Summary
        </CardTitle>
        <CardContent>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.id} className="border-b-gray-200 border-b-2 py-2">
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col items-center gap-2 justify-center">
                    <Image
                      src={item.imageUrl || ""}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="object-cover rounded-2xl"
                      priority
                    />
                    <span className="font-bold ">{item.name}</span>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center font-bold text-gray-600">
                    <p>
                      Quantity:
                      <span className="text-gray-500 font-semibold">
                        {item.quantity}
                      </span>
                    </p>
                    <p>
                      Unit Price: $
                      <span className="text-gray-500 font-semibold">
                        {(item.price / 100).toFixed(2)}
                      </span>
                    </p>

                    <div className="flex gap-3 items-center">
                      <Button
                        variant={"default"}
                        onClick={() => addItem({ ...item, quantity: 1 })}
                        name="add"
                      >
                        +
                      </Button>
                      <p>{item.quantity}</p>
                      <Button
                        className="bg-white border-1-black text-black shadow hover:bg-white "
                        onClick={() => removeItem({ ...item, quantity: 1 })}
                        name="remove"
                      >
                        -
                      </Button>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-500">
                    <span className="font-bold text-gray-600">
                      Total Price:{" "}
                    </span>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold my-4 text-center">
            Total Amount: ${totalPrice.toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <form action={checkOutActions} className="mx-auto max-w-md">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button className=" px-8" variant={"default"} name="checkout">
          Process to Payment
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
