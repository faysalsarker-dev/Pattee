import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from './../../Hook/useAuth';
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
export function Register() {


  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const [err,setErr]=useState(false)
  const { createUser, profileUpdate ,googleLogin ,setUser,loading,setLoading} = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
      try {
          const formData = new FormData();
          formData.append("image", img);

          const { data: imgData } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`, formData);


          console.log(imgData.data.display_url);
          createUser(data.email, data.password)
              .then(() => {
                  profileUpdate(data.name, imgData.data.display_url)
                      .then((res) => {
                          toast.success("Registration successful");
                          setUser(res.user)
                          navigate('/');
                          reset(); 
                           
                      })
                     
              }).catch(error => {
                setErr(error.message);
                setLoading(false)

            })

              
      } catch (error) {
          console.error('Error during registration:', error);
          toast.error("Registration failed. Please try again later. ");
      }
  };

  const handleImg = (event) => {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImg(file);
  };

  const handleGoogle=()=>{
    googleLogin()
    .then(()=>{
        toast.success("Registration successful");
    navigate('/');
    })
  
  }


  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="transparent" shadow={false} className="p-8">
        <Typography variant="h4" color="primary" className="text-center">
          Register 
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
        >
          <div className="text-center relative">
            <label
              htmlFor="fileInput"
              className=" mx-auto flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Uploaded"
                    className="w-full h-full m-auto rounded-full"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute bottom-0 ml-12 text-primary font-extrabold"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>

            
                </>
              )}
              <input
                id="fileInput"
                type="file"
                onChange={(e) => {
                  handleImg(e);
                  setImg(e.target.files[0]);
                }}
                className="hidden  mx-auto"
              />
            </label>
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              {...register("name", { required: true })}
              size="lg"
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>
{
  err &&  <p className="text-red-600">
  {err}
</p>
}
          <Button
          disabled={loading}
            type="submit"
            className="mt-6 bg-primary"
            fullWidth
            variant="filled"
          >
           {loading? <BeatLoader size={6} color="#FFFFFF" />: 'Sign Up'}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?
            <Link
              to='/login'
              className="font-medium text-primary"
              
            >
              LogIn
            </Link>
          </Typography>
          <div className="flex justify-center">
         <h2>OR</h2>
          </div>
         
        </form>
        <div className='flex justify-center gap-2 '>
                        <button className="w-full"  disabled={loading} onClick={handleGoogle} ><div className="flex justify-center gap-4 items-center  px-3 rounded-full border-black border py-3"><img className="w-6" src="https://i.ibb.co/3ShjXGS/google.png" alt="google" />
        Google</div></button>
                        <button className="w-full" disabled={loading}><div className="flex justify-center gap-4 items-center p-4 rounded-full border-black border"><img className=' w-6' src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="githube" border="0" />Github</div></button>

                      
                    </div>
      </Card>
     
    </div>
  );
}
