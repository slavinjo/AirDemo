import React, { SyntheticEvent, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Hotel } from '../../../app/model/Hotel'
import { setEditMode, useDeleteHandler, useSelectActivity } from '../../../app/store/ActivityStore'


interface Props {
    hotels: Hotel[] | undefined;
    submitting: boolean | undefined;

}

export const ActivityList = ({ hotels, submitting }: Props) => {

    const [target, setTarget] = useState('')
    const { deleteActivityHandler } = useDeleteHandler();
    const queryClient = useQueryClient()
    const selectActivity = useSelectActivity();
    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name)
        deleteActivityHandler(id)
    }

    if (!hotels) return <div />

    return (
        <Segment>
            <Item.Group divided>
                {hotels?.map(act => (
                    <Item key={`${act.id}`}>
                        <Item.Content>
                            <Item.Header as='a' onClick={() => selectActivity(act, queryClient)}>{act.name} </Item.Header>
                            <Item.Meta>{act.available}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}</div>
                                {/* <div>{act.city}, {act.venue}</div> */}
                                <Icon name='favorite' color="yellow" />
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => {
                                    selectActivity(act, queryClient)
                                    setEditMode(false, queryClient)
                                }} floated='right' content='View' color='blue' />
                                <Button
                                    name={act.name}
                                    loading={submitting && target === act.name}
                                    onClick={(e) => handleActivityDelete(e, act.name)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label content={act.description} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>

        </Segment>

    )
}
