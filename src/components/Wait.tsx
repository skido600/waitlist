import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview";

export default function Wait() {
  return (
    <>
      <div className="h-[30rem] relative font-poppins  w-full dark:bg-black  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none  flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <main className="text-center px-2 ">
          <div className="text-[70px]  tracking-[-1px] font-bold mb-4 m-auto font-inter md:flex justify-center gap-x-4  ">
            <p> Rewrite</p>
            <p className="text-[#6898A6] mt-[-2rem]  md:mt-0 animate-color-change">
              Thing.
            </p>
          </div>
          <p className="text-[#69748B] text-[20px]">
            Take your writing skills to another level. With the use of the
            powerful{" "}
            <span className="text-[#155E75] font-bold underline decoration-wavy ">
              {" "}
              Gemini AI pro integration!
            </span>
          </p>
          <p className="text-[#69748B] mt-2 text-[14px]">
            Enter your email to join the waitlist! Be amongst the first users!
          </p>
          <p className="text-[#69748B] mt-4 text-[14px]">
            ✨ Embrace the future of flawless composition – Rewrite Thing awaits
            your creative journey! ✨
          </p>

          <div className="mt-2 ">
            <div>
              <AnimatedTooltipPreview />
            </div>
            <div className="mt-[-2rem]">
              <p className="text-[#69748B] text-[14px]">+50 users worldwide!</p>
            </div>
          </div>

          <article className="relative mb-8">
            <input
              placeholder="enter email to join ex.john@gmail.com"
              type="text"
              className="border-2 border-[#69748B] bottom-0 rounded-lg px-4 py-4 w-[90%] pr-16"
            />
            <button className="absolute md:right-16 right-6 top-[0.28rem] bg-[#262D3E] font-inter rounded-lg text-white px-8 py-3">
              Join
            </button>
          </article>
        </main>
      </div>
    </>
  );
}
