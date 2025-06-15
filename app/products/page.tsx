import ProductList from "@/components/ProductList";
import { stripe } from "@/lib/stripe";
import React from "react";

const ProductsPage = async () => {
  const productsList = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = productsList.data;
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold ">
        All{" "}
        <span className="text-blue-500">
          Pro
          <span className="border-b-teal-500 border-b-3">ducts</span>
        </span>
      </h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
