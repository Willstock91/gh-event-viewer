import React from 'react';
import styles from './Home.module.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import MaterialTable from 'material-table';
import ActorRow from '../stateless/ActorRow';
import RepoLink from '../stateless/RepoLink';
import Details from '../Details/Details';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.gh = props.service;
    this.state = {
      title: 'Event Feed',
      selected: 'public',
      tableCols: [
        {title: "Repository", field: "repo.name", render: rowData => <RepoLink name={rowData.repo.name} onClick={() => this.click(rowData.repo.name)}></RepoLink>}, 
        {title: "Event Type", field: "type"},
        {title: "Username", field: "actor.login", render: rowData => <ActorRow actor={rowData.actor}></ActorRow>}
      ],
      tableData: [],
      detail: null, 
      user: props.user
    };
    
  }

  render() {

    let content;
    if(this.state.detail) {
      content = <Details value={this.state.detail} back={() => this.clearDetail()} click={() => this.click(this.state.detail.repo.name)}></Details>
    }
    else {
      content = 
      <Container fluid>
        <Row>
        <Col><h1>{this.state.title}</h1></Col>
        </Row>
        <Row>
          <Col md={10}></Col>
          {this.state.user && 
          <Col md={2}>
            <div className={styles.res}>
              <label className={styles.spacing}><input type="radio" name="selected" value="public" checked={this.state.selected === 'public'} onChange={this.eventTypeChange}/> Public</label>
              <label className={styles.spacing}><input type="radio" name="selected" value="byUser" checked={this.state.selected === 'byUser'} onChange={this.eventTypeChange}/> By User</label>
            </div>
          </Col>}
        </Row>
        <Row>
          <Col>
            <MaterialTable title="Events" columns={this.state.tableCols} data={this.state.tableData}
              actions={[
                {
                  tooltip: 'Show Event Details',
                  icon: 'chevron_right',
                  position: 'row',
                  onClick: (evt, data) => this.setDetail(data)
                },
                {
                  tooltip: 'Refresh Event Data',
                  icon: 'refresh',
                  isFreeAction: true,
                  onClick: (evt) => this.componentDidMount()
                }
              ]}
            ></MaterialTable>
          </Col>
        </Row>
      </Container>
    }

    return (
      <Jumbotron>
        {content}
      </Jumbotron>
    );
  }

  eventTypeChange = changeEvent => {
    let selected = changeEvent.target.value;
    let promise = selected === 'public' ? this.gh.getEventData() : this.gh.getEventsForUser(this.state.user.login);
    promise.then(data =>  {
      this.setState({selected: selected, tableData: data})
    });
  }

  setDetail = data => {
    console.log(data);
    this.setState({detail: data});
  }

  click = repo => {
    window.open(`https://github.com/${repo}`);
  };

  clearDetail = () => {
    this.setState({detail: null});
  }

  componentDidMount(){
    this.gh.getEventData(this.state.selected).then(data => {
      this.setState({tableData: data});
    });
  }
}

export default Home;
