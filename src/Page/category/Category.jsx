import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxiosCommon";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { CardDefault } from "../../componenet/Card";

const Category = () => {
    const { cetegory } = useParams();
    const axiosCommon = useAxios();

    const { data = [], isLoading ,error} = useQuery({
        queryKey: ["category", cetegory],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/category/${cetegory}`);
            return data;
        },
    });

    return (
        <div className="mt-20">
            {isLoading ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton height={200} />
                            <Skeleton height={30} className="mt-4" />
                            <Skeleton height={20} className="mt-2" />
                            <Skeleton height={20} className="mt-2" />
                        </div>
                    ))}
                </div>
            ) :!error && data.length === 0 ? (
                <div className="text-center h-[70vh] flex justify-center items-center flex-col mt-10">
                    <h2 className="text-2xl font-semibold">No pets found in this category</h2>
                    <p className="mt-2">Please check back later or explore other categories.</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {data?.map(pd => (
                        <CardDefault key={pd._id} pd={pd} />
                    ))}
                </div>
            )}
             {error && <p className="text-red-500 text-center">An error occurred {error.message}</p>}
        </div>
    );
};

export default Category;
