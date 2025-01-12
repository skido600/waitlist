export default function Footer() {
  return (
    <>
      <main className="bg-[#2C3E50]  lg:relative right-0 left-0 py-[3.1rem] ">
        <div className="flex gap-x-4  justify-center font-inter">
          <div className="flex items-center gap-x-3 text-center ">
            <div>
              <p className="text-[13px] font-bold">
                Wave <span className="text-[#8A2BE2] font-inter">Queue</span>
              </p>
            </div>
          </div>
          <div className="text-[#8A2BE2] font-poppins">
            ©2025, leowave Develps Inc
          </div>
          <div className="text-[#8A2BE2] font-poppins">Develps Inc</div>
        </div>
        <article className="flex justify-center mt-4">
          <ul className="flex items-center gap-x-5  text-white font-poppins">
            <li>privacy policy</li>
            <li>About</li>
          </ul>
        </article>
      </main>
    </>
  );
}
