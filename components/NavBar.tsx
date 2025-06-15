"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { Menu, ShoppingCart, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const NavBar = () => {
  const { items } = useCartStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <nav className="flex justify-between items-center mx-auto px-4 py-2 bg-white shadow sticky z-50">
        <Link href="/" className="font-bold text-lg text-gray-500">
          My E-commerce
        </Link>
        <div className="flex gap-4  font-semibold *:hover:text-gray-500 max-sm:hidden">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative max-sm:hidden">
            <ShoppingCart className="text-4xl" />
            {itemsCount > 0 && (
              <span className="text-xs absolute -top-1 -right-1 rounded-full bg-blue-500 text-white font-semibold px-1 text-center">
                {itemsCount}
              </span>
            )}
          </Link>

          <Button
            variant={"ghost"}
            onClick={() => setIsMobile(!isMobile)}
            className="md:hidden"
            name="menu"
          >
            {isMobile ? <X /> : <Menu />}
          </Button>
          <div>
            <SignedOut>
              <div className="flex gap-2 *:hover:cursor-pointer font-semibold ">
                <SignInButton />
                <SignUpButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
      {isMobile && (
        <div
          className="flex flex-col gap-2 font-semibold *:hover:text-white *:hover:bg-gray-300 md:hidden border-b-3 border-gray-300 justify-center items-center pb-3"
          onClick={() => setIsMobile(false)}
        >
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
