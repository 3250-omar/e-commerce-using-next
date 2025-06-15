"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Stripe from "stripe";

const ProductList = ({ products }: { products: Stripe.Product[] }) => {
  const [search, setSearch] = useState<string>("");

  const FilteredProducts = products.filter((product) => {
    if (search === "") return product;
    const name = product.name.toLowerCase().includes(search.toLowerCase());
    const desc = product.description
      ? product.description.toLowerCase().includes(search.toLowerCase())
      : false;

    return name || desc;
  });
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <div>
        <input
          type="text"
          placeholder="Search Products ..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 outline-none text-sm w-[300px]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {FilteredProducts.length === 0 && <p>No Product Found</p>}
      <div>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {FilteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
