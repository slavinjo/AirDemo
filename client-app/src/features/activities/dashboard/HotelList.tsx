import { useQueryClient } from 'react-query'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { StarsComponent } from '../../../app/layout/StarsComponent'
import { Hotel } from '../../../app/model/Hotel'
import { setSelectedHotel } from '../../../app/store/HotelStore'

interface Props {
    hotels: Hotel[] | undefined;
}

export const HotelList = ({ hotels }: Props) => {
    const queryClient = useQueryClient()

    if (!hotels) return <div />

    return (
        <Segment>
            <Item.Group divided>
                {hotels?.map(hotel => (
                    <Item key={`${hotel.id}`}>
                        <Item.Content>
                            <Item.Header as='a' onClick={() => { }}>{hotel.name} </Item.Header>
                            <Item.Meta>{hotel.available ? <div style={{ color: '#11b411' }}>{"Available!"}</div> : <div style={{ color: 'red' }}>{"Sorry, not available for given period."}</div>}</Item.Meta>
                            <Item.Description>
                                <div>{hotel.description}</div>
                                <StarsComponent stars={hotel.stars} />
                            </Item.Description>
                            <Item.Extra>
                                {hotel.available && <Label color='brown' style={{ marginLeft: "10px", marginTop: "18px" }} content={`${hotel.cheapestOfferPrice + " " + hotel.cheapestOfferCurrency}`} />}

                                <Button onClick={() => {
                                    setSelectedHotel(hotel, queryClient)
                                }} floated='right' content='View' color='blue' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
