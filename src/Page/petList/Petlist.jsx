/* eslint-disable react/prop-types */
import { Button, Input, Typography } from "@material-tailwind/react";

import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from '@tanstack/react-query';
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import useAxios from './../../Hook/useAxiosCommon';
import { CardDefault } from './../../componenet/Card';

const options = [
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
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
    queryKey: ['pet',search,selectedOption],
    queryFn: async () => {
      const sortValue = selectedOption ? selectedOption.value : '';
      const { data } = await axiosCommon.get(`/pet?search=${search}&sort=${sortValue}`);
      return data;
    },
  });


  const onSubmit = (data) => {
    setSearch(data.name);
   
  };

  if (isLoading) return <p>Loading...</p>;
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
        {data?.map(pd => <CardDefault key={pd._id} pd={pd}></CardDefault>)}
      </div>
      <div className="text-center my-8 flex justify-center">
        <DefaultPagination 
          // totalPages={data.totalPages}
          // currentPage={data.currentPage}
          // setPage={setPage}
        />
      </div>
    </>
  );
};

export default Petlist;

const DefaultPagination = ({ totalPages, currentPage, setPage }) => {
  const getItemProps = (index) => ({
    variant: "text",
    className: `${currentPage === index ? 'bg-primary text-white' : 'text-gray-700'}`,
    onClick: () => setPage(index),
  });

  const next = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};
