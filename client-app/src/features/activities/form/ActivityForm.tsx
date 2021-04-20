import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from 'semantic-ui-react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment'
import { EDIT_MODE, useCreateOrEditHandler, useSelectedActivity, useSubmitting } from '../../../app/store/ActivityStore'

interface Props {
    //activity: Activity | undefined;
    closeForm: () => void;

    //cb: () => void
    //createOrEdit: (activity: Activity) => void;
    // submitting: boolean | undefined;
}



export const ActivityForm = ({ closeForm }: Props) => {

    const queryClient = useQueryClient()

    const { createOrEditActivityHandler } = useCreateOrEditHandler();

    const selectedActivity = useSelectedActivity()

    const initialState = selectedActivity ?? {
        id: '',
        name: '',
        description: '',
        stars: 0,
        available: true
    }

    const { isSubmitting } = useSubmitting()

    const [activity, setActivity] = useState(initialState);

    const handleSubmit = () => {
        console.log(activity);
        createOrEditActivityHandler(activity);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value });
    }

    const test = async (state: boolean) => {
        await queryClient.setQueryData(EDIT_MODE, state)
    }

    const { mutateAsync } = useMutation(test, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(EDIT_MODE)
            //cb()
        }
    })


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.name} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.available} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.name} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.name} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.name} name='venue' onChange={handleInputChange} />
                <Button loading={isSubmitting as boolean} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => mutateAsync(false)} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}


