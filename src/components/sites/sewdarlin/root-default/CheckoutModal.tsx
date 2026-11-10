"use client";

import React, { useRef, useState } from "react";
import { X, Printer, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

type RazorpayInstance = { open: () => void; on: (event: string, cb: (r: unknown) => void) => void };
type RazorpayCtor = new (options: Record<string, unknown>) => RazorpayInstance;
declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

interface Line { id: string; title: string; price: number; quantity: number; amount: number }
interface Customer { name: string; email: string; phone: string; address: string; city: string; state: string; pincode: string }
interface Invoice {
  orderId: string;
  paymentId: string;
  date: string;
  lines: Line[];
  subtotal: number;
  shipping: number;
  courier?: string;
  total: number;
  customer: Customer;
}

interface Quote { shipping: number; courier?: string; days?: number }

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// Phone input is kept to digits only, max 10, as the person types (see onPhone below).
// This just turns a valid 10-digit Indian mobile number into "+919876543210", or null if invalid.
function normalizePhone(raw: string): string | null {
  const m = raw.match(/^[6-9]\d{9}$/);
  return m ? `+91${m[0]}` : null;
}

const EMPTY: Customer = { name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" };

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { cart, subtotal, clearCart, setIsCartOpen } = useCart();
  const [form, setForm] = useState<Customer>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [quoteErr, setQuoteErr] = useState("");
  const latestPin = useRef("");

  // Instant shipping charge as soon as the 6-digit pincode is typed.
  const onPincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pin = e.target.value.replace(/\D/g, "").slice(0, 6);
    setForm((f) => ({ ...f, pincode: pin }));
    setQuote(null);
    setQuoteErr("");
    latestPin.current = pin;
    if (pin.length === 6) void fetchQuote(pin);
  };

  const fetchQuote = async (pin: string) => {
    setQuoting(true);
    try {
      const res = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode: pin, items: cart.map(({ product, quantity }) => ({ id: product.id, quantity })) }),
      });
      const data = await res.json();
      if (latestPin.current !== pin) return;
      if (!res.ok) setQuoteErr(data.error || "Could not calculate shipping.");
      else setQuote({ shipping: data.shipping, courier: data.courier, days: data.days });
    } catch {
      if (latestPin.current === pin) setQuoteErr("Could not calculate shipping. Check your internet and try again.");
    } finally {
      if (latestPin.current === pin) setQuoting(false);
    }
  };

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Only digits, max 10, as the person types — matches the pincode field's pattern.
  const onPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, phone }));
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) return "Please enter a valid email address.";
    if (!normalizePhone(form.phone)) return "Please enter a valid 10-digit mobile number.";
    if (!form.address.trim() || !form.city.trim() || !form.state.trim()) return "Please complete your address.";
    if (!/^\d{6}$/.test(form.pincode)) return "Please enter a valid 6-digit pincode.";
    if (quoting) return "Calculating shipping, one moment…";
    if (quoteErr) return quoteErr;
    if (!quote) return "Please wait while we calculate shipping.";
    return "";
  };

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setError("");
    setBusy(true);
    const phone = normalizePhone(form.phone) as string;
    const customer = { ...form, phone };

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(({ product, quantity }) => ({ id: product.id, quantity })),
          customer,
        }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Could not start the payment.");

      if (!(await loadRazorpay()) || !window.Razorpay) throw new Error("Could not load the payment window. Check your internet and try again.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Sewmaistic",
        description: "Handmade with love, Delhi",
        prefill: { name: form.name, email: form.email, contact: phone },
        theme: { color: "#000000" },
        // Only UPI and Cards: hide EMI, Netbanking, Wallet and Pay Later.
        method: { upi: true, card: true, netbanking: false, wallet: false, emi: false, paylater: false },
        config: {
          display: {
            blocks: {
              upi: { name: "Pay via UPI", instruments: [{ method: "upi" }] },
              card: { name: "Pay via Card", instruments: [{ method: "card" }] },
            },
            hide: [{ method: "emi" }, { method: "netbanking" }, { method: "wallet" }, { method: "paylater" }],
            sequence: ["block.upi", "block.card"],
            preferences: { show_default_blocks: false },
          },
        },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const vr = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            });
            const data = await vr.json();
            if (!vr.ok || !data.ok) throw new Error();
            setInvoice({
              orderId: resp.razorpay_order_id,
              paymentId: resp.razorpay_payment_id,
              date: new Date().toLocaleString("en-IN"),
              lines: order.lines,
              subtotal: order.subtotal,
              shipping: order.shipping,
              courier: order.courier,
              total: order.total,
              customer,
            });
            clearCart();
          } catch {
            setError("Payment went through but we could not confirm it. Please contact us with your payment id: " + resp.razorpay_payment_id);
          } finally {
            setBusy(false);
          }
        },
      });
      rzp.on("payment.failed", () => {
        setError("Payment failed. Nothing was charged, please try again.");
        setBusy(false);
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  };

  const printInvoice = () => {
    if (!invoice) return;
    const rows = invoice.lines
      .map((l) => `<tr><td>${esc(l.title)}</td><td style="text-align:center">${l.quantity}</td><td style="text-align:right">${inr(l.price)}</td><td style="text-align:right">${inr(l.amount)}</td></tr>`)
      .join("");
    const c = invoice.customer;
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) return;
    w.document.write(`<html><head><title>Invoice ${esc(invoice.orderId)}</title><style>
      body{font-family:Georgia,serif;padding:40px;color:#111}table{width:100%;border-collapse:collapse;margin-top:20px}
      th,td{padding:8px;border-bottom:1px solid #ddd;font-size:14px;text-align:left}h1{margin:0}p{margin:4px 0;font-size:14px}</style></head><body>
      <h1>Sewmaistic</h1><p>Handmade accessories, Delhi, India</p><hr/>
      <p><b>Invoice / Receipt</b></p><p>Order: ${esc(invoice.orderId)}</p><p>Payment: ${esc(invoice.paymentId)}</p><p>Date: ${esc(invoice.date)}</p>
      <p style="margin-top:12px"><b>Billed to</b><br/>${esc(c.name)}<br/>${esc(c.address)}, ${esc(c.city)}, ${esc(c.state)} ${esc(c.pincode)}<br/>${esc(c.phone)} · ${esc(c.email)}</p>
      <table><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Amount</th></tr>${rows}</table>
      <p style="text-align:right;margin-top:16px">Subtotal: ${inr(invoice.subtotal)}</p>
      <p style="text-align:right">Shipping${invoice.courier ? ` (${esc(invoice.courier)})` : ""}: ${invoice.shipping === 0 ? "Free" : inr(invoice.shipping)}</p>
      <p style="text-align:right;font-size:18px"><b>Total paid: ${inr(invoice.total)}</b></p>
      <p style="margin-top:30px">Thank you for shopping with Sewmaistic!</p></body></html>`);
    w.document.close();
    w.focus();
    w.print();
  };

  const closeAll = () => {
    if (invoice) setIsCartOpen(false);
    onClose();
  };

  const input = "w-full border border-[#D5CEC2] rounded-md px-3 py-2 text-[14px] text-[#2E3A42] bg-white focus:outline-none focus:border-black";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={busy ? undefined : closeAll} />
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#FBF9F4] rounded-lg shadow-2xl border border-[#EBE6DD]">
        <button onClick={closeAll} disabled={busy} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-[#F2ECE1] text-[#4F5A5E]" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        {invoice ? (
          <div className="p-6 sm:p-8 font-sans">
            <div className="flex items-center gap-2 text-black">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><Check className="w-5 h-5" /></span>
              <h2 className="font-serif text-[26px]">Payment successful</h2>
            </div>
            <p className="mt-1 text-[13px] text-[#7A878B]">Order {invoice.orderId} · Payment {invoice.paymentId}</p>

            <div className="mt-5 bg-white border border-[#EBE6DD] rounded-md p-4 text-[14px] text-[#2E3A42]">
              {invoice.lines.map((l) => (
                <div key={l.id} className="flex justify-between py-1">
                  <span>{l.title} × {l.quantity}</span>
                  <span>{inr(l.amount)}</span>
                </div>
              ))}
              <hr className="my-2 border-[#EBE6DD]" />
              <div className="flex justify-between"><span>Subtotal</span><span>{inr(invoice.subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{invoice.shipping === 0 ? "Free" : inr(invoice.shipping)}</span></div>
              <div className="flex justify-between font-medium text-[16px] mt-1"><span>Total paid</span><span>{inr(invoice.total)}</span></div>
            </div>
            <p className="mt-3 text-[13px] text-[#4F5A5E]">
              Shipping to {invoice.customer.name}, {invoice.customer.address}, {invoice.customer.city}, {invoice.customer.state} {invoice.customer.pincode}. Dispatched from Delhi within 3 to 4 business days with tracking.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={printInvoice} className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-[#262626] text-white py-2.5 rounded-full text-[14px]">
                <Printer className="w-4 h-4" /> Print invoice
              </button>
              <button onClick={closeAll} className="flex-1 border border-black text-black py-2.5 rounded-full text-[14px] hover:bg-[#F2ECE1]">Continue shopping</button>
            </div>
          </div>
        ) : (
          <form onSubmit={pay} className="p-6 sm:p-8 font-sans">
            <h2 className="font-serif text-[26px] text-[#2E3A42]">Checkout</h2>
            <p className="text-[13px] text-[#7A878B] mb-4">Enter your details, then pay securely with Razorpay (UPI, cards, netbanking, wallets).</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className={input} placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
              <input className={input} placeholder="Email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
              <input className={input} placeholder="Mobile number (10 digits)" inputMode="numeric" maxLength={10} value={form.phone} onChange={onPhone} autoComplete="tel" />
              <input className={input} placeholder="Pincode" inputMode="numeric" maxLength={6} value={form.pincode} onChange={onPincode} autoComplete="postal-code" />
              <input className={`${input} sm:col-span-2`} placeholder="Address (house, street, area)" value={form.address} onChange={set("address")} autoComplete="street-address" />
              <input className={input} placeholder="City" value={form.city} onChange={set("city")} autoComplete="address-level2" />
              <select className={input} value={form.state} onChange={set("state")} autoComplete="address-level1">
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="mt-5 bg-white border border-[#EBE6DD] rounded-md p-4 text-[14px] text-[#2E3A42]">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between py-0.5">
                  <span className="line-clamp-1 pr-3">{product.title} × {quantity}</span>
                  <span>{inr(product.price * quantity)}</span>
                </div>
              ))}
              <hr className="my-2 border-[#EBE6DD]" />
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {quoting ? "Calculating…" : quoteErr ? "—" : quote ? (quote.shipping === 0 ? "Free" : inr(quote.shipping)) : "Enter pincode"}
                </span>
              </div>
              {quote?.courier && (
                <p className="text-[12px] text-[#7A878B] text-right">
                  via {quote.courier}{quote.days ? `, about ${quote.days} day${quote.days === 1 ? "" : "s"}` : ""}
                </p>
              )}
              <div className="flex justify-between font-medium text-[16px] mt-1"><span>Total</span><span>{inr(subtotal + (quote?.shipping ?? 0))}</span></div>
            </div>

            {quoteErr && <p className="mt-3 text-[13px] text-[#DC2626]">{quoteErr}</p>}
            {error && error !== quoteErr && <p className="mt-3 text-[13px] text-[#DC2626]">{error}</p>}

            <button
              type="submit"
              disabled={busy || cart.length === 0}
              className="mt-5 w-full bg-black hover:bg-[#262626] active:bg-[#404040] disabled:opacity-60 text-white py-3 rounded-full text-[15px] font-medium transition-colors"
            >
              {busy ? "Please wait…" : `Pay ${inr(subtotal + (quote?.shipping ?? 0))}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
