import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import { useState } from "react";

const AddPet = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImg = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        Add a New Pet
      </Typography>
      <form className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative w-1/3">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-full "
              />
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                alt="Default"
                className="w-full h-full rounded-full"
              />
            )}
            <input
              type="file"
              onChange={handleImg}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <Typography variant="h6" color="blue-gray">
                Pet Name
              </Typography>
              <Input
                size="lg"
                placeholder="Enter pet name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Pet Age
              </Typography>
              <Input
                size="lg"
                placeholder="Enter pet age"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Pet Location
              </Typography>
              <Input
                size="lg"
                placeholder="Enter location"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Short Description
              </Typography>
              <Input
                size="lg"
                placeholder="Enter short description"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Long Description
              </Typography>
              <Textarea
                size="lg"
                placeholder="Enter detailed description"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
          </div>
        </div>
        <Button className="mt-6" fullWidth>
          Add Pet
        </Button>
      </form>
    </div>
  );
};

export default AddPet;
