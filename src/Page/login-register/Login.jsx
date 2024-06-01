import { Button, Card, Input, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import useAuth from "../../Hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const Login = () => {
    const { signIn,  googleLogin } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
           
            signIn(data.email,data.password)
            .then(() => {
                toast.success("Login successful");
                navigate('/');
                reset(); 
                console.log('login');
                
            });
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error("Registration failed. Please try again later.");
        }
    };

  
  
    const handleGoogle=()=>{
      googleLogin()
      toast.success("Registration successful");
      navigate('/');
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
         
          <div className="mb-1 flex flex-col gap-6">
      
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

          <Button
            type="submit"
            className="mt-6 bg-primary"
            fullWidth
            variant="filled"
          >
            Sign Up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
           New Hare ! 
            <Link to='/register'
              href="#"
              className="font-medium text-primary ml-2"
              
            >
             Register
            </Link>
          </Typography>
          <div className="flex justify-center">
         <h2>OR</h2>
          </div>
         
        </form>
        <div className='flex justify-center gap-2 '>
                        <button className="w-full"  onClick={handleGoogle} ><div className="flex justify-center gap-4 items-center  px-3 rounded-full border-black border py-3"><img className=' w-6' src="https://i.ibb.co/3ShjXGS/google.png" alt="google"  />Google</div></button>
                        <button className="w-full"><div className="flex justify-center gap-4 items-center p-4 rounded-full border-black border"><img className=' w-6' src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="githube" border="0" />Github</div></button>

                      
                    </div>
      </Card>
     
    </div>
    );
};

export default Login;