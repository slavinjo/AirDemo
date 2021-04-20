import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
    inverted?: boolean; // light or dark background
    content?: string;
}

export const LoadingComponent = ({ inverted = true, content = 'Loading...' }: Props) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}
