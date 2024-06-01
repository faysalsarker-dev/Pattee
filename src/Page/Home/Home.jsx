import Banner from "../../componenet/Banner";





const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <div className="my-8">
            <section className="flex justify-center items-center  text-primary py-16">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Adopt a Pet, Change a Life</h2>
        <p className="text-lg mb-8">
          Thousands of pets are looking for a loving home. Be the hero they need.
        </p>
        <button className="bg-white text-primary font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
          Adopt Now
        </button>
      </div>
      <div className="">
        <img
          src="https://img.freepik.com/free-vector/cute-illustrated-adopt-pet-concept_23-2148512934.jpg?t=st=1717235602~exp=1717239202~hmac=ab38f9b1431cf6c0b3d27dec6f818797ceb2d67e3610446e292f52f98569e480&w=740"
          alt="Inspirational Pet"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
            </div>
            
        </div>
    );
};

export default Home;