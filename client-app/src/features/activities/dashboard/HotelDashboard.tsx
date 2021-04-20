import { useQueryClient } from 'react-query'
import { Grid } from 'semantic-ui-react'
import { Hotel } from '../../../app/model/Hotel'
import { SELECTED_HOTEL, SUBMITTING, useHotels, useEditMode, useQueryParams } from '../../../app/store/HotelStore'
import { HotelDetails } from '../details/HotelDetails'
import { HotelForm } from '../form/HotelForm'
import { HotelList } from './HotelList'
import '../../../app/layout/styles.css';
import { LoadingComponent } from '../../../app/layout/LoadingComponent'
import { useState } from 'react'

interface Props {
    cancelActivity: () => void;
}

export const HotelDashboard = ({ cancelActivity }: Props) => {
    const queryClient = useQueryClient()
    const selectedHotel = queryClient.getQueryData<Hotel | undefined>(SELECTED_HOTEL)
    const submitting: boolean | undefined = queryClient.getQueryData(SUBMITTING)
    const { isEditMode } = useEditMode();
    const { queryParams } = useQueryParams()
    const { activities, error, isFetching } = useHotels(queryParams);

    if (isFetching) return <LoadingComponent content='Loading hotels' />

    return (
        <Grid>
            <Grid.Column width='10' >
                <HotelList
                    hotels={activities}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6' >
                {
                    selectedHotel &&
                    <HotelDetails />
                }
                {isEditMode &&
                    <HotelForm
                        closeForm={cancelActivity}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}
