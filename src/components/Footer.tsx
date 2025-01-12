export default function Footer() {
  return (
    <>
      <main className="bg-[#155E75] absolute bottom-0 right-0 left-0 py-[3.1rem] ">
        <div className="flex gap-x-4  justify-center font-inter">
          <div className="flex items-center gap-x-3 text-center">
            <div>
              <p className="text-[13px] font-bold">
                Rewrite{" "}
                <span className="text-[#6898A6] font-inter">Thing.</span>
              </p>
            </div>
          </div>
          <div>© 2024, elorm.tsx Develps Inc</div>
          <div>Develps Inc</div>
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
