/* eslint-disable react/prop-types */
import { Button, Input, Typography } from "@material-tailwind/react";

import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from '@tanstack/react-query';

import useAxios from './../../Hook/useAxiosCommon';
import { CardDefault } from './../../componenet/Card';
import Skeleton from "react-loading-skeleton";

const options = [
  { value: "cat", label: "cat" },
  { value: "dog", label: "dog" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
];
const Petlist = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [search, setSearch] = useState('');

  const axiosCommon = useAxios();
  const { register, handleSubmit} = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ['pets',search,selectedOption],
    queryFn: async () => {
      const sortValue = selectedOption ? selectedOption.value : '';
      const { data } = await axiosCommon.get(`/pet?search=${search}&sort=${sortValue}`);
      return data;
    },
  });


  const onSubmit = (data) => {
    setSearch(data.name);
   
  };

 
  if (error) return <p>An error occurred</p>;

  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-4">
  <div className="w-1/4">
    <Typography variant="h6" color="blue-gray">
      Pet Category
    </Typography>
    <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
      className="mt-2"
    />
  </div>

  <form onSubmit={handleSubmit(onSubmit)} className="relative mt-8 flex-1">
    <Input
      type="text"
      label="Search"
      className="pr-20 w-full"
      {...register("name", { required: true })}
      containerProps={{
        className: "min-w-0",
      }}
    />
    <Button
      type="submit"
      size="sm"
      className="!absolute right-1 top-1 rounded bg-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 w-14"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </Button>
  </form>
</div>

      <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {/* {data?.map(pd => <CardDefault key={pd._id} pd={pd}></CardDefault>)} */}
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton height={200} />
              <Skeleton height={30} className="mt-4" />
              <Skeleton height={20} className="mt-2" />
              <Skeleton height={20} className="mt-2" />
            </div>
          ))
        ) : (
          data?.map(pd => <CardDefault key={pd._id} pd={pd}></CardDefault>)
        )}





      </div>
      <div className="text-center my-8 flex justify-center">
      </div>
    </>
  );
};

export default Petlist;


