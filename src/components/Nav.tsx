"use client";
import { FaPen } from "react-icons/fa";
export default function Nav() {
  return (
    <>
      <main>
        <nav className="flex items-center justify-between md:px-8 px-2 py-4 fixed right-0 left-0">
          <div className="flex items-center gap-2">
            <div>
              <FaPen className="text-[#8A2BE2]" size={10} type="icon" />
            </div>
            <div>
              <p className="text-[13px] font-bold">
                Wave <span className="text-[#8A2BE2] font-inter">Queue</span>
              </p>
            </div>
          </div>

          <article>
            <a
              href="#waitlist-input"
              className="hover:bg-[#F1F5F9] border py-2 bg-white rounded-[5px] px-3 text-[14px] font-poppins font-bold"
            >
              Join waitlist
            </a>
          </article>
        </nav>
      </main>
    </>
  );
}
