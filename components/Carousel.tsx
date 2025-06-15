"use client";

import { useEffect, useState } from "react";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface CarouselProps {
  products: Stripe.Product[];
}
const Carousel = ({ products }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const currentProduct = products[currentSlide];
  const price = currentProduct.default_price as Stripe.Price;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);
  if (products.length === 0) return null;

  return (
    <Card className="border-none">
      <div className="relative ">
        <div className="relative aspect-[4/3] w-full h-[250px]">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-opacity duration-500 ease-in-out h-auto"
            priority
          />
        </div>
        <CardContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out text-3xl font-bold text-white flex flex-col gap-4 justify-center items-center ">
          <CardTitle>{products[currentSlide].name}</CardTitle>
          {price && price.unit_amount && (
            <p className="text-xl ">${(price.unit_amount / 100).toFixed(2)}</p>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default Carousel;
