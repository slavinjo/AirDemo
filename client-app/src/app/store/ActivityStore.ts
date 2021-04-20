import agent from "../api/agent";
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Hotel } from "../model/Hotel";
import { v4 as uuid } from 'uuid';
import { INSPECT_MAX_BYTES } from "node:buffer";

export const HOTEL_LIST: string = 'hotels';
export const SELECTED_ACTIVITY: string = 'selected_activity';
export const EDIT_MODE: string = 'edit_mode';
export const SUBMITTING: string = 'submitting';
export const DELETE_CALLBACK: string = 'submitting';
export const QUERY_PARAMS: string = 'query_params';


export const useHotels = (query: any) => {
    console.log("HOTELI")
    console.log(query)
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

export const useSelectedActivity = (): Hotel | undefined => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(SELECTED_ACTIVITY)
    //return selectedActivity;
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

export const useSubmitting = () => {
    const queryClient = useQueryClient()
    const getSubmitting = async () => {
        return await queryClient.getQueryData(SUBMITTING)
    }
    const { data: isSubmitting } = useQuery(SUBMITTING, getSubmitting, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    })
    return { isSubmitting }
}


export const setSelectedActivity = (activity: Hotel | undefined, queryClient: QueryClient) => {
    queryClient.setQueryData(SELECTED_ACTIVITY, activity)
    //queryClient.invalidateQueries(HOTEL_LIST)
};

export const setQueryParams = (params: any, queryClient: QueryClient) => {
    console.log("PISEM")
    queryClient.setQueryData(QUERY_PARAMS, params)
    queryClient.invalidateQueries(QUERY_PARAMS)
};

export const setRefetchHotels = (params: any, queryClient: QueryClient) => {
    console.log("Brisem hotele")
    queryClient.invalidateQueries([HOTEL_LIST, params])
};

export const useSelectActivity = () => {
    return setSelectedActivity;
}

export const setEditMode = async (state: boolean, queryClient: QueryClient) => {
    await queryClient.setQueryData(EDIT_MODE, state)
    //await queryClient.invalidateQueries(EDIT_MODE)
};

export const setSubmitting = async (state: boolean, queryClient: QueryClient) => {
    await queryClient.setQueryData(SUBMITTING, state)
    //await queryClient.invalidateQueries(SUBMITTING)
};

export const useDeleteHandler = () => {
    const queryClient = useQueryClient()
    const selectedHotel: Hotel | undefined = useSelectedActivity();

    const deleteActivityHandler = (id: string) => {
        setSubmitting(true, queryClient)
        agent.Hotels.delete(id).then(() => {
            if (id === selectedHotel?.name) {
                setSelectedActivity(undefined, queryClient);
            }
            queryClient.invalidateQueries(HOTEL_LIST).then(() => queryClient.invalidateQueries([SELECTED_ACTIVITY]).then(() =>
                setSubmitting(false, queryClient))
            )
        })
    }
    return { deleteActivityHandler }
}


export const useCreateOrEditHandler = () => {
    const queryClient = useQueryClient()
    //const { data: activities, isLoading } = useQuery<Activity[]>(ACTIVITY_LIST)
    const activities: Hotel[] | undefined = queryClient.getQueryData(HOTEL_LIST)

    const createOrEditActivityHandler = (activity: Hotel) => {

        setSubmitting(true, queryClient);
        //const activity = queryClient.getQueryData<Activity>(SELECTED_ACTIVITY);
        if (activity?.name) {
            agent.Hotels.update(activity).then(() => {
                setSelectedActivity(activity, queryClient)
                setEditMode(false, queryClient)
                setSubmitting(false, queryClient)
                queryClient.invalidateQueries(HOTEL_LIST)
            })
        } else {
            activity!.name = uuid();
            agent.Hotels.create(activity!).then(() => {
                activities?.push(activity!);
                setSelectedActivity(activity, queryClient)
                setEditMode(false, queryClient)
                setSubmitting(false, queryClient)
                queryClient.invalidateQueries(HOTEL_LIST)
            })
        }
    }
    return { createOrEditActivityHandler }
}