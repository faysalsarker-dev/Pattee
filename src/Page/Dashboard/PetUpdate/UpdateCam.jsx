import {
    Button,
    Input,
    Typography,
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
  import { useState} from "react";
  import { useForm } from "react-hook-form";
  import toast from "react-hot-toast";
  import ReactQuill from "react-quill";
  
  import SyncLoader from "react-spinners/SyncLoader";
  import { format } from "date-fns";
  import { DayPicker } from "react-day-picker";
  import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
  import { useMutation, useQuery } from "@tanstack/react-query";
  import useAxiosSecure from "../../../Hook/useAxiosSecure";
  import useAuth from "../../../Hook/useAuth";
  import { useParams } from "react-router-dom";
import useAxios from "../../../Hook/useAxiosCommon";

  
  const UpdateCam = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [btnSpin, setBtnSpin] = useState(false);
    const [img, setImg] = useState(null);
    const [value, setValue] = useState("");
    const axiosSecure = useAxiosSecure();
    const [host, setHost] = useState(false);
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [date, setDate] = useState(new Date());
const axiosCommon = useAxios()
  
    const { id } = useParams();
    const { data = {} } = useQuery({
      queryKey: [user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/campaigns-details/${id}`);
        setImageUrl(data.image);
        setValue(data.long_des);
        setDate(new Date(data.last_date));
        return data;
      },
    });
  
    const modules = {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
    };
  
    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ];
  
    const { mutateAsync } = useMutation({
      mutationFn: async (info) => {
        const { data } = await axiosSecure.post(`/update-cam/${id}`, info);
        return data;
      },
      onSuccess: () => {
        setBtnSpin(false);
        toast.success("Campaign updated successfully!");
        reset();
        setImageUrl(null);
        setImg(null);
        setValue("");
      },
      onError: (error) => {
        console.error("Error updating campaign:", error);
        setBtnSpin(false);
        toast.error(`Error updating campaign. Please try again. ${error}`);
      },
    });
  



    const onSubmit = async (formData) => {
          setBtnSpin(true);
         const uploadData = new FormData();
        uploadData.append("image", img);
        try {
          let imgData = null;
          if (host) {
            const { data: hostImages } = await axiosCommon.post(
              `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMG_API}`,
              uploadData
    
            );
            imgData = hostImages;
          }
    
          const newData = {
            image: imgData ? imgData.data.display_url : imageUrl,
          name: formData.pet_name,
          maximum_amount: parseFloat(formData.maximum_amount),
          last_date: date,
          short_des: formData.short_des,
          long_des: value,
          };
    console.log(newData);
          await mutateAsync(newData);
        } catch (error) {
          console.error("Error uploading image:", error);
          setBtnSpin(false);
          toast.error("Error uploading image. Please try again.");
        }
      };




















    // const onSubmit = async (formData) => {
    //   setBtnSpin(true);
    //   const uploadData = new FormData();
    //   uploadData.append("image", img);
  
    //   try {
    //     let imgData = null;
    //     if (host) {
    //       const { data: hostImages } = await axios.post(
    //         `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMG_API}`,
    //         uploadDataimport useAxios from './../../../Hook/useAxiosCommon';

    //       );
    //       imgData = hostImages;
    //     }
  
    //     const newData = {
    //      
    //       name: formData.pet_name,
    //       maximum_amount: parseFloat(formData.maximum_amount),
    //       last_date: date,
    //       short_des: formData.short_des,
    //       long_des: value,
    //     };
  
    //     await mutateAsync(newData);
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //     setBtnSpin(false);
    //     toast.error("Error uploading image. Please try again.");
    //   }
    // };
  
    const handleImg = (event) => {
      setHost(true);
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImg(file);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Update Donation Campaign
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
                            <div className="border-dashed flex justify-center items-center border-2 border-gray-300 bg-gray-50 w-full h-64 rounded-lg">
                            <h3 className="text-center text-xl font-semibold flex items-center gap-2 text-gray-500">
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
                    <div className="flex flex-col gap-4">
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Pet Name
                            </Typography>
                            <Input
                            defaultValue={data.name}
                                size="lg"
                                {...register("pet_name", )}
                                placeholder="Enter pet name"
                                className={`!border-t-blue-gray-200 focus:!border-primary ${errors.pet_name ? 'border-red-500' : ''}`}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            {errors.pet_name && <span className="text-red-500">Pet name is required</span>}
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Maximum donation amount
                            </Typography>
                            <Input
                            defaultValue={data.maximum_amount}
                                size="lg"
                                type="number"
                                {...register("Maximum_amount", )}
                                placeholder="Enter maximum donation amount"
                                className={`!border-t-blue-gray-200 focus:!border-primary ${errors.Maximum_amount ? 'border-red-500' : ''}`}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            {errors.Maximum_amount && <span className="text-red-500">Maximum donation amount is required</span>}
                        </div>

                        <div>
                            <Typography className="mt-5" variant="h6" color="blue-gray">
                                Campaign End Date
                            </Typography>
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <Input
                                        label="Select a Date"
                                        onChange={() => null}
                                        value={date ? format(date, "PPP") : ""}
                                    />
                                </PopoverHandler>
                                <PopoverContent>
                                    <DayPicker
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        showOutsideDays
                                        className="border-0"
                                        classNames={{
                                            caption: "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label: "text-sm font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous: "absolute left-1.5",
                                            nav_button_next: "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row: "flex font-medium text-gray-900",
                                            head_cell: "m-0.5 w-9 font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today: "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled: "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Short Description
                    </Typography>
                    <Input
                    defaultValue={data.short_des}
                        size="lg"
                        {...register("short_des")}
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
                            formats={formats}
                        />
                    </div>
                </div>
            </div>
            <Button disabled={btnSpin} type="submit" className="mt-10 bg-primary hover:bg-primary-dark transition-colors duration-300" fullWidth>
                {btnSpin ? <SyncLoader size={8} color="#FFFFFF" /> : 'Add Pet'}
            </Button>
        </form>
    </div>
    );
};

export default UpdateCam;
