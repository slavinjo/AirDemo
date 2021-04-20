import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment'
import { useSelectedHotel } from '../../../app/store/HotelStore'

interface Props {
    closeForm: () => void;
}

export const HotelForm = ({ closeForm }: Props) => {
    const selectedHotel = useSelectedHotel()

    const initialState = selectedHotel ?? {
        id: '',
        name: '',
        description: '',
        stars: 0,
        available: true
    }
    const [hotel, setHotel] = useState(initialState);

    const handleSubmit = () => {
        console.log(hotel);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHotel({ ...hotel, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={hotel.name} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={hotel.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={hotel.available} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={hotel.name} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={hotel.name} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={hotel.name} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => { }} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}


