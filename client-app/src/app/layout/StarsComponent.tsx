import React from 'react'
import { Icon, Segment } from 'semantic-ui-react'

interface Props {
    stars: number;
}
const addStars = (stars: number) => {
    let starsList: JSX.Element[] = []
    for (var i = 1; i < 6; i++) {
        if (i > stars) {
            starsList.push(
                <Icon key={i} name='favorite' color="grey" />
            )
        } else {
            starsList.push(
                <Icon key={i} name='favorite' color="yellow" />
            )
        }
    }
    return starsList;
}

export const StarsComponent = ({ stars }: Props) => {
    return (
        <Segment style={{ float: 'left' }}>
            { addStars(stars)}
        </Segment>
    )
}
