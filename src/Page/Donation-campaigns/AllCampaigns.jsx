import { useInfiniteQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxiosCommon";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import DonationCard from "./DonationCard";
import Skeleton from "react-loading-skeleton";

const AllCampaigns = () => {
    const axiosCommon = useAxios();
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['donation-campaigns'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosCommon.get(`/all-donation-campaigns?page=${pageParam}`);
            return response.data;
        },
        getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextPage : undefined,
    });

    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <>
            <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
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
                    data.pages.map((page) => (
                        page.result.map((campaign) => (
                            <DonationCard key={campaign._id} pd={campaign} />
                        ))
                    ))
                )}
            </div>
            <div ref={ref} className="text-center my-8 flex justify-center">
                {isFetchingNextPage && (
                    <div>
                        <Skeleton height={200} />
                        <Skeleton height={30} className="mt-4" />
                        <Skeleton height={20} className="mt-2" />
                        <Skeleton height={20} className="mt-2" />
                    </div>
                )}
            </div>
            {error && <p>An error occurred</p>}
        </>
    );
};

export default AllCampaigns;
