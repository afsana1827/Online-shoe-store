const page = () => {
  return (
    <div className="">
      <img src="/Header-Thisispuma_Karsten.jpg" alt="" className="w-screen" />
      <div className="items-center justify-center  ">
        <h3 className="text-3xl  p-6 text-center ">
          PERFORMANCE ON ALL LEVELS
        </h3>
        <h5 className="text-gray-500 justify-center  text-center px-[290px]">
          Sport has the power to transform and empower us. As one of the world’s
          leading sports brands, it’s only natural that we want to stand on the
          same playing field as the fastest athletes on the planet.To achieve
          that, the SneakerHive brand is based on the very values that make an
          excellent athlete.
        </h5>
      </div>

      <div className="ml-8 ">
        <h1 className="text-4xl font-bold text-gray-600 py-14">
          SNEAKER HIVE IN FIGURES
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          <div className="">
            <h1 className="text-6xl font-bold py-6">8.465</h1>
            <p className="text-3xl">BILLION SALES IN 2023</p>
          </div>
          <div className="">
            <h1 className="text-6xl font-bold py-6">641</h1>
            <p className="text-3xl">MILLION EBIT IN 2023</p>
          </div>
          <div className="">
            <h1 className="text-6xl font-bold py-6 ">≈20,000</h1>
            <p className="text-3xl">EMPLOYEES</p>
          </div>
          <div className="">
            <h1 className="text-6xl font-bold py-6">1948</h1>
            <p className="text-3xl">YEAR OF BIRTH</p>
          </div>
        </div>
      </div>
      <div className="bg-[url('/Experienced_Players.jpg')] bg-cover bg-no-repeat relative w-screen h-screen">
        <div className="clr w-full h-full absolute top-0 left-0">
          {/* text */}
          <div className="container pt-16">
            <p className="text-[#FFF] uppercase tracking-[3px] ">
              Posted on <span className="font-bold">startup</span>
            </p>
            <div className="lg:w-[603px] pt-8">
              <p className="font-bold text-4xl font-san text-[#FFFFFF]">
                Step-by-step guide to choosing great font pairs
              </p>
            </div>
            <p className="text-white pt-5 font-inter">
              By <span className="text-[#FFD050]"> James West</span> | May 23,
              2022
            </p>

            <p className="text-white lg:w-[565px] py-8 font-inter">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
