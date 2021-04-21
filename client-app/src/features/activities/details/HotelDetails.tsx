import { useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { Button, Card, Image } from 'semantic-ui-react'
import agent from '../../../app/api/agent';
import { Hotel } from '../../../app/model/Hotel'
import { SELECTED_HOTEL, setSelectedHotel } from '../../../app/store/HotelStore';

export const HotelDetails = () => {
    const queryClient = useQueryClient()
    const hotel: Hotel | undefined = queryClient.getQueryData<Hotel>(SELECTED_HOTEL)
    const refs = useRef<HTMLInputElement>(null);

    const getRandomImage = async () => {
        let imageUrl = await agent.Hotels.photos()
        let photo = imageUrl.config.url;
        const img = refs.current?.children[0].children[0].children[0]
        img?.setAttribute("src", photo!);
    }

    useEffect(() => {
        getRandomImage()
        return () => {
        }
    }, [hotel])

    return (
        <div ref={refs}>
            <Card fluid style={{ position: 'fixed', height: 'auto', width: '30em' }}>
                <Image wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{hotel?.name}</Card.Header>
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
        </div>
    )
}
