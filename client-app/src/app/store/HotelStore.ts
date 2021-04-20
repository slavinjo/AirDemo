import agent from "../api/agent";
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { Hotel } from "../model/Hotel";

export const HOTEL_LIST: string = 'hotels';
export const SELECTED_HOTEL: string = 'selected_hotel';
export const EDIT_MODE: string = 'edit_mode';
export const SUBMITTING: string = 'submitting';
export const DELETE_CALLBACK: string = 'submitting';
export const QUERY_PARAMS: string = 'query_params';

export const useHotels = (query: any) => {
    const isEnabled = typeof query !== 'undefined';
    const { isLoading, error, data: activities, isFetching } = useQuery<Hotel[], Error>([HOTEL_LIST, query],
        () => agent.Hotels.hotelsList(query), {
        refetchOnWindowFocus: false,
        cacheTime: 1000,
        retry: false,
        enabled: isEnabled
    });
    return { isLoading, error, activities, isFetching };
};

export const useSelectedHotel = (): Hotel | undefined => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(SELECTED_HOTEL)
};

export const useEditMode = () => {
    const queryClient = useQueryClient()
    const getEditMode = async () => {
        return await queryClient.getQueryData(EDIT_MODE)
    }
    const { data: isEditMode } = useQuery(EDIT_MODE, getEditMode, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    })
    return { isEditMode }
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

export const useSelectHotel = () => {
    return setSelectedHotel;
}

export const setEditMode = async (state: boolean, queryClient: QueryClient) => {
    await queryClient.setQueryData(EDIT_MODE, state)
};


