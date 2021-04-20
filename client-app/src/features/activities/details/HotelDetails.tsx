import { useQueryClient } from 'react-query';
import { Button, Card, Image } from 'semantic-ui-react'
import { Hotel } from '../../../app/model/Hotel'
import { SELECTED_HOTEL, setSelectedHotel } from '../../../app/store/HotelStore';

export const HotelDetails = () => {
    const queryClient = useQueryClient()
    const hotel: Hotel | undefined = queryClient.getQueryData<Hotel>(SELECTED_HOTEL)

    return (
        <Card fluid>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
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
