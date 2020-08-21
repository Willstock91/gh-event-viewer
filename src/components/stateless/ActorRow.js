import React from 'react';

const styles = {
    'maxWidth': '100%',
    'maxHeight': '100%',
    'height': '20px',
    'width': '20px',
    'marginRight': '10px'
};

const ActorRow = props => (<span><img alt="avatar" style={styles} src={props.actor.avatar_url}/>{props.actor.login}</span>);

export default ActorRow;