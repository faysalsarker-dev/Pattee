import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
  return (
    <>
      <div className='lg:h-[80vh] md:h-[40vh] sm:h-[40vh] h-[45vh] relative rounded-xl my-4 p-4'>
        <div className='absolute inset-0 w-full h-full'>
          <div className="w-full h-full bg-cover bg-center rounded-lg" style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("https://img.freepik.com/premium-photo/group-puppies-are-sitting-ledge-with-one-them-being-mix-white_564714-43494.jpg?w=1060")`
          }}>
         
          </div>
        </div>
        <div className="absolute top-1/4 left-0 right-0 z-5 mt-10 text-center space-y-3">
          <h1 className="md:text-4xl text-2xl md:font-extrabold font-bold text-gray-800 mb-2">Welcome to <span className='text-primary'>Pattee</span></h1>
          <p className="text-lg font-medium text-gray-700">Where every wag of a tail and purr of contentment brings happiness to your heart.</p>
          <h3 className="text-4xl font-bold  mb-4 text-[#553a2a]">
                <Typewriter
                  words={['Embrace a Furry Companion', 'Discover Unconditional Love']}
                  loop={false}
                  cursor
                  cursorStyle='_'
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </h3>
        </div>
      </div>
    </>
  );
};

export default Banner;
