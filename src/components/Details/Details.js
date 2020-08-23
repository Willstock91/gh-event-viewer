import React from 'react';
import styles from './Details.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import RepoLink from '../stateless/RepoLink';
import ActorRow from '../stateless/ActorRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class Details extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {details: props.value};
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col className={styles.center}>
                        <Card className={styles.root}>
                            <CardHeader
                                action={
                                <IconButton aria-label="back" onClick={() => this.props.back()}>
                                    <ArrowBackIcon></ArrowBackIcon>
                                </IconButton>
                                }
                                title={<ActorRow actor={this.state.details.actor}></ActorRow>}
                            />
                            <CardContent>
                                <Typography paragraph><label>Event ID: </label> {this.state.details.id}</Typography>
                                <Typography paragraph><label>Event Type: </label> {this.state.details.type}</Typography>
                                <Typography paragraph><label>Repository: </label> <RepoLink name={this.state.details.repo.name} onClick={() => this.props.click(this.state.details.repo.name)}></RepoLink></Typography>
                                <Typography paragraph><label>Created At: </label> {this.state.details.created_at}</Typography>
                            </CardContent>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>
            
        );
    }

    componentDidMount() {

    }

}

export default Details;