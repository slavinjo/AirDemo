import { Grid } from 'semantic-ui-react'
import { useHotels, useQueryParams, useSelectedHotel } from '../../../app/store/HotelStore'
import { HotelDetails } from '../details/HotelDetails'
import { HotelList } from './HotelList'
import '../../../app/layout/styles.css';
import { LoadingComponent } from '../../../app/layout/LoadingComponent'


export const HotelDashboard = () => {
    const selectedHotel = useSelectedHotel()
    const { queryParams } = useQueryParams()
    const { hotels, isFetching } = useHotels(queryParams);

    if (isFetching) return <LoadingComponent content='Loading hotels' />

    return (
        <Grid>
            <Grid.Column width='10' >
                <HotelList
                    hotels={hotels}
                />
            </Grid.Column>
            <Grid.Column width='6' >
                {
                    selectedHotel &&
                    <HotelDetails />
                }

            </Grid.Column>
        </Grid>
    )
}
