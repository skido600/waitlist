"use client";
import { useState } from "react";
import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview";
import * as Toast from "@radix-ui/react-toast";
import Loader from "./helper/Loader";

export default function Wait() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    status: "success",
  });

  // Toast function to show the toast
  const showToast = (message: string, status: "success" | "error") => {
    setToast({ open: true, message, status });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/joinWaitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json(); // Parse the response as JSON

      if (response.ok) {
        showToast("Successfully joined the waitlist!", "success");
        setEmail("");
      } else if (response.status === 409) {
        const errorMsg =
          data?.error || "This email is already on our waitlist.";
        setError(errorMsg);
        showToast(errorMsg, "error");
      } else if (response.status === 500) {
        const errorMsg =
          data?.error ||
          "There was a problem adding your email. Please try again later.";
        setError(errorMsg);
        showToast(errorMsg, "error");
      } else {
        const errorMsg =
          data?.message || "Something went wrong. Please try again.";
        setError(errorMsg);
        showToast(errorMsg, "error");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      showToast(`An error occurred. Please try again later. ${err}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[50rem] font-poppins w-full dark:bg-black dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <main className="text-center mb-8 w-[315px] md:w-[500px] lg:w-[680px] mt-12 sm:-mt-[2.5rem]">
          <div className="text-[70px] tracking-[-1px] font-bold mb-4 m-auto font-inter md:flex justify-center gap-x-4">
            <p>Wave</p>
            <p className="text-[#8A2BE2] mt-[-2rem] md:mt-0 animate-color-change">
              Queue
            </p>
          </div>
          <p className="text-[#69748B] text-[20px]">
            Unlock the potential of your creativity with
            <span className="text-[#00C8A3] font-bold underline decoration-wavy">
              {" "}
              Gemini AI pro integration!{" "}
            </span>
            A game-changer in writing technology!
          </p>
          <p className="text-[#69748B] mt-2 text-[14px]">
            Enter your email to join the waitlist! Be amongst the first users!
          </p>
          <p className="text-[#69748B] mt-4 text-[14px]">
            ✨ Embrace the future of flawless composition – Rewrite Thing awaits
            your creative journey! ✨
          </p>

          <div className="mt-2">
            <div>
              <AnimatedTooltipPreview />
            </div>
            <div className="mt-[-2rem]">
              <p className="text-[#69748B] text-[14px]">+50 users worldwide!</p>
            </div>
          </div>

          <article className="relative mb-8 mt-8">
            <label htmlFor="waitlist-input" className="sr-only">
              Enter your email
            </label>
            <input
              id="waitlist-input"
              placeholder="Enter email to join (e.g., john@gmail.com)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-2 rounded-lg px-4 py-4 w-[90%] pr-16 ${
                error
                  ? "border-red-500 placeholder:text-red-500"
                  : "border-[#69748B] placeholder:text-[#69748B]"
              }`}
              aria-invalid={!!error}
              aria-describedby="email-error"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`absolute md:right-16 right-6 top-[0.28rem] font-inter rounded-lg px-8 py-3 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#262D3E] text-white"
              }`}
            >
              {loading ? <Loader /> : "Join"}
            </button>
          </article>
        </main>
      </div>

      {/* Toast component */}
      <Toast.Provider>
        <Toast.Root
          open={toast.open}
          onOpenChange={(open) => setToast({ ...toast, open })}
          className={`fixed top-4 right-4 w-[80%] max-w-[400px] px-8 py-4 rounded-md shadow-md text-white ${
            toast.status === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <Toast.Title className="font-bold capitalize">
            {toast.status === "success" ? "Success" : "Error"}
          </Toast.Title>
          <Toast.Description className="text-sm">
            {toast.message}
          </Toast.Description>
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
      </Toast.Provider>
    </>
  );
}
