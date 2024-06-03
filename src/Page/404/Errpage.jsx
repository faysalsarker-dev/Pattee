
import { Link, useNavigate } from 'react-router-dom';


const Errpage = () => {

  const navigate = useNavigate()
  const returnBack=()=>{
navigate()-1
  }
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold  mb-4">404</h1>
        <p className="text-xl  mb-8">
          Oops! The page youre looking for doesnt exist.
        </p>
        <div className="space-x-4">
    
              <button
             onClick={returnBack}
                className="bg-red-600  py-2 px-4 rounded-full inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
</svg>

                Go Back
              </button>
     
      <Link to='/'>
              <button
                
                className="bg-blue-600 text-white py-2 px-4 rounded-full inline-flex items-center"
              >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

                Go Home
              </button>
      </Link>
        </div>
      </div>
    </div>
  );
};

export default Errpage;
