
import { useMutation, useQueryClient } from 'react-query';
import { Button, Card, Image } from 'semantic-ui-react'
import { Hotel } from '../../../app/model/Hotel'
import { EDIT_MODE, SELECTED_ACTIVITY } from '../../../app/store/ActivityStore';

interface Props {

    cancelActivity: () => void;
    //  openForm: (id: string) => void;
    //cb: () => void
}

export const ActivityDetails = ({ cancelActivity }: Props) => {

    const queryClient = useQueryClient()
    const activity: Hotel | undefined = queryClient.getQueryData<Hotel>(SELECTED_ACTIVITY)

    const test = async (state: boolean) => {
        await queryClient.setQueryData(EDIT_MODE, state)
    }

    const { mutateAsync } = useMutation(test, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(EDIT_MODE)
            // cb()
        }
    })


    return (

        <Card fluid>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity!.name}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='right'>
                <Button onClick={() => mutateAsync(true)} content="Edit" color='blue' basic />
                <Button onClick={cancelActivity} basic color='red' content='Cancel' />
            </Card.Content>
        </Card>
    )
}
