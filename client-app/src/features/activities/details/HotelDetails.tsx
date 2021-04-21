import { useQueryClient } from 'react-query';
import { Button, Card, Image } from 'semantic-ui-react'
import { Hotel } from '../../../app/model/Hotel'
import { SELECTED_HOTEL, setSelectedHotel } from '../../../app/store/HotelStore';

export const HotelDetails = () => {
    const queryClient = useQueryClient()
    const hotel: Hotel | undefined = queryClient.getQueryData<Hotel>(SELECTED_HOTEL)

    return (
        <Card fluid style={{ position: 'fixed', height: 'auto', width: '30em' }}>
            <Image src='https://images.pexels.com/photos/6016679/pexels-photo-6016679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{hotel!.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{hotel!.name}</span>
                </Card.Meta>
                <Card.Description>
                    {hotel!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='right'>
                <Button onClick={() => setSelectedHotel(undefined, queryClient)} basic color='red' content='Cancel' />
            </Card.Content>
        </Card >
    )
}
