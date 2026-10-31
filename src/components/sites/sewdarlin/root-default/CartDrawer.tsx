"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CheckoutModal } from "./CheckoutModal";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F4] shadow-2xl flex flex-col border-l border-[#EBE6DD] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EBE6DD] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#4F5A5E]" />
              <h2 className="font-serif text-[22px] text-[#2E3A42]">Your Bag</h2>
              <span className="text-xs bg-[#F2ECE1] text-[#4F5A5E] px-2 py-0.5 rounded-full font-sans">
                {cart.reduce((t, i) => t + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#F2ECE1] text-[#4F5A5E] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#7A878B] py-12">
                <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 text-[#B8C2C5]" />
                <p className="font-serif text-[20px] text-[#4F5A5E] mb-1">Your bag is empty</p>
                <p className="text-[13px] text-[#7A878B] max-w-[220px] mb-6">
                  Explore our handcrafted bows, scrunchies, and Kindle sleeves to fill it up!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-black hover:bg-[#262626] text-white font-sans px-6 py-2.5 rounded-full text-[13px] transition-colors shadow-2xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex space-x-4 p-3 bg-white rounded-lg border border-[#EBE6DD] shadow-2xs"
                >
                  {/* Item Image */}
                  <div className="relative w-20 h-20 bg-[#F5F2EB] rounded-md overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans text-[14px] text-[#2E3A42] font-medium leading-snug line-clamp-1">
                          {product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#9EA8AC] hover:text-red-500 transition-colors p-0.5 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[13px] text-[#DC2626] mt-0.5">
                        {product.formattedPrice}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center border border-[#D5CEC2] rounded-full px-2 py-0.5 bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:text-black transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#4F5A5E]" />
                        </button>
                        <span className="mx-2 text-xs font-mono text-[#2E3A42]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:text-black transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#4F5A5E]" />
                        </button>
                      </div>
                      <span className="text-xs text-[#7A878B] font-mono ml-auto">
                        {`₹${(product.price * quantity).toLocaleString("en-IN")}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EBE6DD] bg-white space-y-3">
              <div className="flex items-center justify-between text-[15px] font-sans">
                <span className="text-[#4F5A5E]">Subtotal</span>
                <span className="font-serif text-[20px] text-[#2E3A42] font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[12px] text-[#7A878B]">
                Taxes and shipping calculated at checkout.
              </p>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="w-full bg-black hover:bg-[#262626] active:bg-[#404040] text-white font-sans font-medium py-3 rounded-full text-[15px] transition-all duration-200 shadow-xs active:scale-98"
              >
                Checkout Now • ₹{subtotal.toLocaleString("en-IN")}
              </button>
            </div>
          )}
        </div>
      </div>
      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    </div>
  );
}
