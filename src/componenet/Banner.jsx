import { Typewriter } from 'react-simple-typewriter';


const Banner = () => {
    return (
        <div className="flex gap-4 justify-around items-center lg:h-[80vh] md:h-[40vh] sm:h-[40vh] h-[45vh] rounded-xl my-4 p-4 bg-white ">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4">
            <Typewriter
              words={['Take a Good Friend', 'Welcome to Our World of Companionship']}
              loop={5}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h3>
          <p className="text-lg font-medium text-gray-700">
            In a world of uncertainties, find solace in the unconditional love of your faithful friends. Welcome to a place where companionship knows no bounds.
          </p>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?t=st=1717229373~exp=1717232973~hmac=24536afcc96e9acfefc036c74a79bc6647a20308e854ef74b550e22b597bdd83&w=360"
            alt="Cat"
            className="rounded-xl"
          />
        </div>
      </div>
    );
};

export default Banner;