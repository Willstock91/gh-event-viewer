import React from 'react';

const styles = {
    'maxWidth': '100%',
    'maxHeight': '100%',
    'height': '20px',
    'width': '20px',
    'marginRight': '10px'
};

const ActorRow = props => {
    let url = props.actor ? props.actor.avatar_url : props.avatar_url;
    let login = props.actor ? props.actor.login : props.login;
    return (<span><img alt="avatar" style={styles} src={url}/>{login}</span>);
}

export default ActorRow;