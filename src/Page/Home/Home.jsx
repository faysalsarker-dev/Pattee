import Banner from "../../componenet/Banner";
import CategoryCard from "./CategoryCard";

import { Link } from "react-router-dom";
import { Button } from '@material-tailwind/react';
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxiosCommon";

import CatImg from './../../assets/img/cat.png'
import DogImg from './../../assets/img/dog.png'
import BirdImg from './../../assets/img/bird.png'
import FishImg from './../../assets/img/clown-fish.png'
import RabbitImg from './../../assets/img/rabbit.png'
import { CardDefault } from './../../componenet/Card';
import  Skeleton  from 'react-loading-skeleton';



const petCategories = [
  { name: "Cats", img: CatImg, link: '/category/Cat' },
  { name: "Dogs", img: DogImg, link: '/category/Dog' },
  { name: "Birds", img: BirdImg, link: '/category/Bird' },
  { name: "Fish", img: FishImg, link: '/category/Fish' },
  { name: "Rabbit", img: RabbitImg, link: '/category/Rabbit' }
];

const Home = () => {
  const axiosCommon=useAxios()
  const { data=[], isLoading, error } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      try {
        const response = await axiosCommon.get(`/pet?page=${1}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  });


  return (
    <>
      <Banner />
      <h3 className="text-5xl text-center font-bold mt-10">Explore Our Categories</h3>
      <section className="grid md:grid-cols-5 grid-cols-2 gap-3 my-8">
        {petCategories.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </section>

      <div className="py-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 p-6 flex justify-center items-center">
            <img className="rounded-lg shadow-lg w-full h-auto object-cover" src="https://img.freepik.com/premium-vector/hand-drawn-family-with-pets-illustration_23-2149425672.jpg?w=740" alt="Adopt a Pet" />
          </div>
          <div className="lg:w-1/2 p-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 border-r-4 border-primary pr-4">Give a Pet a Forever Home</h2>
            <p className="text-lg text-gray-700 mb-6">Adopting a pet is a life-changing experience. By giving a pet a loving home, you are not just saving a life but also gaining a loyal friend and companion. Every pet deserves a chance to live in a safe and nurturing environment.</p>
            <p className="text-lg text-gray-700 mb-6">Join us in our mission to provide better lives for pets in need. Your love and care can make a significant difference in the life of a pet. Adopt today and be a hero to a homeless animal.</p>
        <div className="text-end">    <Link to='/petlist'><Button className="mt-4 px-8 text-end py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">Adopt Now</Button></Link></div>
          </div>
        </div>
      </div>

      


{error ? (<p className="text-center text-red-500">error {error.message}</p>):(

<div className="container">
<h3 className="text-3xl font-bold my-6 text-center">Available Pets</h3>
<div className="container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
  {isLoading ? (
    <>
      <Skeleton height={200} width={300} style={{ borderRadius: '8px' }} />
      <Skeleton height={200} width={300} style={{ borderRadius: '8px' }} />
      <Skeleton height={200} width={300} style={{ borderRadius: '8px' }} />
    </>
  ) : (
    
      data?.pets?.slice(0,6).map((pd) => (
        <CardDefault key={pd._id} pd={pd}></CardDefault>
      )
    )
  )}
</div>
<div className="text-center my-4"><Link to='/petlist'><Button className="bg-primary">View all</Button></Link></div>
</div>


)}
    





      <div className="py-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 p-6">
            <h2 className="text-3xl lg:text-4xl font-bold border-l-4 border-primary pl-4 mb-6">About Us</h2>
            <p className="text-lg lg:text-xl mb-4 leading-relaxed text-gray-700">
              Welcome to Pattee, a platform dedicated to helping pets find loving homes. We connect prospective pet owners with pets in need of adoption.
            </p>
         <ul className="list-disc pl-4 text-gray-700">
              <li className=" mb-4 leading-relaxed">
                Our website makes the adoption process smooth. Browse pets, view profiles, and contact shelters directly.
              </li>
              <li className=" mb-4 leading-relaxed">
                We aim to reduce homeless pets. Adopt through us to give a pet a second chance and alleviate shelter burden.
              </li>
              <li className=" mb-4 leading-relaxed">
                Join us in making a difference. Every action counts towards creating a better world for these loving animals.
              </li>
         </ul>
            <Link to='/register'><Button className="bg-primary hover:bg-blue-600">Sign Up</Button></Link>
          </div>
          <div className="lg:w-1/2 p-6 flex justify-center items-center">
            <img className="rounded-lg shadow-lg w-full h-auto object-cover" src="https://img.freepik.com/free-vector/flat-design-people-with-pets_23-2148978450.jpg?t=st=1717998222~exp=1718001822~hmac=485ece5c0fb2c46277baffc38c27803aff6e39b9f5cfa99da581f69ef891028d&w=900" alt="Adopt a Pet" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
