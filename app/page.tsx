import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  const productsList = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-evenly items-center rounded-2xl p-10 flex-wrap gap-5 ">
        <div className="flex flex-col justify-between items-center  border-2 h-[250px] font-bold p-5 rounded-2xl max-sm:font-medium">
          <h2>Welcome to Next E-Commerce</h2>
          <p>Discover the best products with us</p>
          <Button variant={"default"} name="products link">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
        <Image
          src={`${productsList.data[0].images[0]}`}
          alt="hero Image"
          width={300}
          height={300}
          priority
          className="rounded-2xl  "
        />
      </div>
      <Carousel products={productsList.data} />
    </section>
  );
};

export default Home;
