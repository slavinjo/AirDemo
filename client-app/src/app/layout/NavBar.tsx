import React, { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query';
import { Menu, Container, Button, Form, Segment } from 'semantic-ui-react'
import cities from '../data/airports.json';
import numbers from '../data/numbers.json';
import { setQueryParams, setRefetchHotels } from '../store/ActivityStore';
import './styles.css';

interface Props {
    openForm: () => void;
    loadHotels: (params: any) => void;
}

var todayDate = new Date().toISOString().substring(0, 10)
const cityList = cities.map(city => {
    return {
        key: city.objectID,
        text: city.city + " - " + city.name,
        value: city.iata_code
    }
})

const NavBar = ({ openForm, loadHotels }: Props) => {

    const queryClient = useQueryClient();

    const initialState = {
        cityCode: cities[0].iata_code,
        checkInDate: todayDate,
        checkOutDate: todayDate,
        adults: '1'
    }

    const [query, setQuery] = useState(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuery({ ...query, [name]: value });
    }

    const handleDropdownChange = (event: React.SyntheticEvent<HTMLElement>, data: any) => {
        setQuery({ ...query, [data.name]: data.value });
    }

    const handleSubmit = () => {
        setQueryParams(query, queryClient)
        setRefetchHotels(query, queryClient)
    }

    return (
        <Fragment>
            <Container fluid className="navbar-sticky">
                <Segment clearing vertical>
                    <Form autoComplete='off' onSubmit={handleSubmit} >
                        <Form.Group inline fluid>
                            <Form.Field>
                                <label style={{ color: "white", minWidth: "25em" }}>Select city</label>
                                <Form.Dropdown
                                    placeholder={cities[0].name}
                                    fluid
                                    search
                                    name='cityCode'
                                    selection
                                    onChange={handleDropdownChange}
                                    options={cityList}
                                    defaultValue={cities[0].iata_code}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: "white" }}>Date from</label>
                                <Form.Input type='date' value={query.checkInDate} placeholder='Date' name='checkInDate' onChange={handleInputChange} />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: "white" }}>Date to</label>
                                <Form.Input type='date' value={query.checkOutDate} placeholder="Date" name='checkOutDate' onChange={handleInputChange} />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: "white" }}>Adults</label>
                                <Form.Dropdown
                                    placeholder={initialState.adults}
                                    fluid
                                    search
                                    name='adults'
                                    selection
                                    onChange={handleDropdownChange}
                                    options={numbers}
                                    defaultValue={initialState.adults}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button floated='right' positive content='Search hotels' />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>
            </Container>

        </Fragment >
    )
}

export default NavBar
