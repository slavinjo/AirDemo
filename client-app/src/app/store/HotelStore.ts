import agent from "../api/agent";
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { Hotel } from "../model/Hotel";

export const HOTEL_LIST: string = 'hotels';
export const SELECTED_HOTEL: string = 'selected_hotel';
export const QUERY_PARAMS: string = 'query_params';

export const useHotels = (query: any) => {
    const isEnabled = typeof query !== 'undefined';
    const { isLoading, error, data: hotels, isFetching } = useQuery<Hotel[], Error>([HOTEL_LIST, query],
        () => agent.Hotels.hotelsList(query), {
        refetchOnWindowFocus: false,
        cacheTime: 1000,
        retry: false,
        enabled: isEnabled
    });
    return { isLoading, error, hotels, isFetching };
};

export const useSelectedHotel = (): Hotel | undefined => {
    const queryClient = useQueryClient()
    const getQueryParams = () => {
        return queryClient.getQueryData<Hotel | undefined>(SELECTED_HOTEL)
    }
    const { data: hotel } = useQuery<Hotel | undefined>(SELECTED_HOTEL, getQueryParams, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: false
    })
    return hotel
}

export const useQueryParams = () => {
    const queryClient = useQueryClient()
    const getQueryParams = () => {
        return queryClient.getQueryData(QUERY_PARAMS)
    }
    const { data: queryParams } = useQuery(QUERY_PARAMS, getQueryParams, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: false
    })
    return { queryParams }
}

export const setSelectedHotel = (hotel: Hotel | undefined, queryClient: QueryClient) => {
    queryClient.setQueryData(SELECTED_HOTEL, hotel)
};

export const setQueryParams = (params: any, queryClient: QueryClient) => {
    queryClient.setQueryData(QUERY_PARAMS, params)
    queryClient.invalidateQueries(QUERY_PARAMS)
};

export const setRefetchHotels = (params: any, queryClient: QueryClient) => {
    queryClient.invalidateQueries([HOTEL_LIST, params])
};




