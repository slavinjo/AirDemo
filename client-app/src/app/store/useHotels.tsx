import { useQuery } from "react-query";
import agent from "../api/agent";
import { HOTEL_LIST } from "./HotelStore";

const getHotels = async (query: any) => {
    const data = agent.Hotels.hotelsList(query);
    return data;
};

export default function useHotels(query: any) {
    const isEnabled = typeof query !== 'undefined';
    return useQuery([HOTEL_LIST, query], () => getHotels(query), {
        enabled: isEnabled,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
       
    });
}
