import Details from "@/components/Details";
import { stripe } from "@/lib/stripe";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));
  return <Details product={plainProduct} />;
};

export default page;
