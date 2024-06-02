import Banner from "../../componenet/Banner";
import Catimg from './../../assets/img/cat.png'
import Dogimg from './../../assets/img/dog.png'
import birdimg from './../../assets/img/bird.png'
import Fishimg from './../../assets/img/clown-fish.png'
import Rabbitimg from './../../assets/img/rabbit.png'
import CategoryCard from "./CategoryCard";




const Home = () => {


  const petCategory= [
    {
      name:"Cats",
      img:Catimg,
      link:'/'
    },
    {
      name:"Dogs",
      img:Dogimg,
      link:'/'
    },
    {
      name:"Birds",
      img:birdimg,
      link:'/'
    },
    {
      name:"Fish",
      img:Fishimg,
      link:'/'
    },
    {
      name:"Rabbit",
      img:Rabbitimg,
      link:'/'
    },
   
  ]




    return (
        <div>
            <Banner></Banner>
<h3 className="text-5xl text-center font-bold mt-10 ">Our Cetegory</h3>
            <section className="grid grid-cols-5 gap-3 my-8">
              {
                petCategory?.map((pd,idx)=> <CategoryCard key={idx} pd={pd} ></CategoryCard>)
              }



            </section>







<div className=" py-12">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 p-6 flex justify-center items-center">
                    <img className="rounded-lg shadow-lg w-full h-auto object-cover" src="https://img.freepik.com/free-vector/cute-illustrated-adopt-pet-concept_23-2148512934.jpg?t=st=1717235602~exp=1717239202~hmac=ab38f9b1431cf6c0b3d27dec6f818797ceb2d67e3610446e292f52f98569e480&w=740" alt="Adopt a Pet" />
                </div>
                <div className="lg:w-1/2 p-6">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">Give a Pet a Forever Home</h2>
                    <p className="text-lg text-gray-700 mb-6">Adopting a pet is a life-changing experience. By giving a pet a loving home, you are not just saving a life but also gaining a loyal friend and companion. Every pet deserves a chance to live in a safe and nurturing environment.</p>
                    <p className="text-lg text-gray-700 mb-6">Join us in our mission to provide better lives for pets in need. Your love and care can make a significant difference in the life of a pet. Adopt today and be a hero to a homeless animal.</p>
                    <button className="mt-4 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">Adopt Now</button>
                </div>
              
            </div>
        </div>



<div>




<div className="py-12 bg-primary rounded-lg">
            <div className="container mx-auto px-6 lg:px-8">
                <h2 className="text-2xl lg:text-4xl font-bold text-center text-white mb-6">About Us</h2>
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-base lg:text-lg text-white mb-4">Welcome to PetAdopt, a platform dedicated to helping pets find loving homes. We believe that every pet deserves a family, and our mission is to connect prospective pet owners with pets in need of adoption.</p>
                    <p className="text-base lg:text-lg text-white mb-4">Our website is designed to make the adoption process as smooth and transparent as possible. You can browse through various categories of pets, view detailed profiles, and get in touch with shelters or foster homes directly through our platform.</p>
                    <p className="text-base lg:text-lg text-white mb-4">We started this initiative to reduce the number of homeless pets and to support animal shelters in their efforts. By adopting a pet through our platform, you are not only giving a pet a second chance but also helping to alleviate the burden on shelters.</p>
                    <p className="text-base lg:text-lg text-white mb-4">Join us in making a difference. Whether you are looking to adopt or support our cause, every action counts towards creating a better world for these loving animals.</p>
                </div>
            </div>
        </div>


</div>


            
        </div>
    );
};

export default Home;