import React from 'react';

const styles = {
    color: '#337ab7'
};


const RepoLink = props => {
    return (<span><a style={styles} onClick={(name) => props.onClick(name)}>{props.name}</a></span>);
}

export default RepoLink;