import { Button, Input } from "@material-tailwind/react";
import { CardDefault } from "../../componenet/Card";
import { useState } from "react";
import Select from "react-select";

import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

import { useQuery } from '@tanstack/react-query'








const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Petlist = () => {
  const [selectedOption, setSelectedOption] = useState(null);

 
  const {
    data,
  } = useQuery({
    queryKey: ['pet'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:5000/pet')
      return data
    },
  })

console.log(data);






  return (
    <>
      <div className="mt-10 flex items-center gap-4">
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          className="w-1/3"
        />
        <div className="relative flex w-full focus:!border-primary">
          <Input
            type="text"
            label="Seach"
            className="pr-20 "
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
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
        </div>
      </div>
      <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {
          data?.map(pd=> <CardDefault key={pd._id} pd={pd}></CardDefault>)
        }
      </div>
    </>
  );
};

export default Petlist;
