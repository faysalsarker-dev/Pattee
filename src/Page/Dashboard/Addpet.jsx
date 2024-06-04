/* eslint-disable no-unused-vars */
import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import  Select  from 'react-select';
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAxiosSecure from "../../Hook/useAxiosSecure";









const options = [
  { value: "Cat", label: "Cat" },
  { value: "Dog", label: "Dog" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
];
const AddPet = () => {
  
  const [imageUrl, setImageUrl] = useState(null);
  const [btnSpin, setBtnSpin] = useState(false);
  const [img, setImg] = useState(null);
  const [date,setDate]=useState(new Date())
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure



  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean'] 
    ],
  };
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];




  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data } = await axiosSecure.post('/add-pet', info);
      return data;
    },
    onSuccess: () => {
      setBtnSpin(false);
      toast.success("Pet added successfully");
      reset();
      setImageUrl(null);
      setImg(null);
    },
    onError: (error) => {
      console.error("Error adding pet:", error);
      setBtnSpin(false);
      toast.error("Error adding pet. Please try again.");
    },
  });

  const onSubmit = async (data) => {
    setBtnSpin(true);
    const formData = new FormData();
    formData.append("image", img);

    try {
      const { data: imgData } = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMG_API}`,
        formData

      );
      const newData = {
        image: imgData.data.display_url,
        name: data.pet_name,
        age: data.pet_age,
        location: data.location,
        short_des: data.short_des,
        long_des: value,
        category:selectedOption.value,
        date:date,
        adopted: false,
        email: user?.email,
      };
      await mutateAsync(newData);
    } catch (error) {
      console.error("Error uploading image:", error);
      setBtnSpin(false);
      toast.error("Error uploading image. Please try again.");
    }
  };

  const handleImg = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setImg(file);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        Add a New Pet
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative w-full">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="border-dashed flex justify-center items-center border-2 border-primary bg-gray-200 w-full h-full rounded-lg">
                  <h3 className="text-center text-2xl font-bold flex items-center gap-2">
                    Upload your image
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </h3>
                </div>
              )}
              <input
                type="file"
                onChange={handleImg}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Pet Name
                </Typography>
                <Input
                  size="lg"
                  {...register("pet_name", { required: true })}
                  placeholder="Enter pet name"
                  className={`!border-t-blue-gray-200 focus:!border-primary ${errors.pet_name ? 'border-red-500' : ''}`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.pet_name && <span className="text-red-500">Pet name is required</span>}
              </div>
           <div className="flex items-center gap-3">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Pet Age
                  </Typography>
                  <Input
                    size="lg"
                    {...register("pet_age", { required: true })}
                    placeholder="Enter pet age"
                    className={`!border-t-blue-gray-200 focus:!border-primary ${errors.pet_age ? 'border-red-500' : ''}`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.pet_age && <span className="text-red-500">Pet age is required</span>}
                </div>
              
     <div className=" w-full">
     <Typography variant="h6" color="blue-gray">
     Pet Category
                  </Typography>
                  <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="w-full my-auto h-full"
            />
    
     </div>
  
             
                
           </div>
           <div>
           <Typography variant="h6" color="blue-gray">
                  Pet Location
                </Typography>
                <Input
                  size="lg"
                  {...register("location", { required: true })}
                  placeholder="Enter location"
                  className={`!border-t-blue-gray-200 focus:!border-primary ${errors.location ? 'border-red-500' : ''}`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
           </div>
            </div>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Short Description
            </Typography>
            <Input
              size="lg"
              {...register("short_des", { required: true })}
              placeholder="Enter short description"
              className={`!border-t-blue-gray-200 focus:!border-primary ${errors.short_des ? 'border-red-500' : ''}`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.short_des && <span className="text-red-500">Short description is required</span>}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Long Description
            </Typography>
      
            <div className="my-8 h-48">
      <ReactQuill   
      
      className="h-full"
      theme="snow" 
        value={value} 
        onChange={setValue} 
        modules={modules}
        formats={formats} />
    </div>

           
          </div>
        </div>
   

{/* <Editor></Editor> */}




        <Button disabled={btnSpin} type="submit" className="mt-10 bg-primary" fullWidth>
          {btnSpin ? <SyncLoader size={8} color="#FFFFFF" /> : 'Add Pet'}
        </Button>
      </form>
    </div>
  );
};

export default AddPet;
