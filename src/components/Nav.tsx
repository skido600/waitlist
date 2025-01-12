import { FaPen } from "react-icons/fa";
export default function Nav() {
  return (
    <>
      <main>
        <nav className="flex items-center justify-around py-4">
          <div className="flex items-center gap-x-3">
            <div>
              <FaPen className="text-[#6898A6]" />
            </div>
            <div>
              <p className="text-[13px] font-bold">
                Rewrite{" "}
                <span className="text-[#6898A6] font-inter">Thing.</span>
              </p>
            </div>
          </div>

          <article>
            <button className="hover:bg-[#F1F5F9] border py-2 bg-white rounded-[5px] px-3 text-[14px] font-poppins font-bold">
              Join waitlist
            </button>
          </article>
        </nav>
      </main>
    </>
  );
}
