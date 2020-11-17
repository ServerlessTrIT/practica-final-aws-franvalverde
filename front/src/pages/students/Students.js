import React from 'react';
import {
  Row,
  Col,
  Table,
} from 'reactstrap';

import Widget from '../../components/Widget';
import s from './Students.module.scss';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import {Link} from "react-router-dom";


class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: props.history,
      dialog: {
        show: false,
        idItem: 0
      },
      data: [
        {
          id: 1,
          name: 'Pablo',
          surname: 'High',
        },
        {
          id: 2,
          name: 'Rubén',
          surname: 'Down',
        },
      ],
    };
  }

  componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': 'Gd7LcGP0xu7ww2Iq3FlgB6vdhXIiZJui8Gllxohl'
    }
    let url = 'https://s451u8kmmj.execute-api.eu-central-1.amazonaws.com/prod/users';
    fetch(url, { headers })
        .then(response => response.json())
        .then(data => console.log({ totalReactPackages: data.total }));
  }

  handleClickNew () {
    this.state.history.push("/app/dashboard");
  }

  handleClickOpen (idItem) {
    this.setState({
      dialog: {
        show: true,
        idItem: idItem
      }
    })
  }

  handleClose () {
    this.setState({
      dialog: {
        show: false,
        idItem: 0
      }
    })
  }

  handleClickEdit (idItem) {
    console.log(idItem)
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Students</h2>
        <Row>
          <Col>
            <Widget>
              <div className="float-right">
                <Link className="btn btn-primary" to="/app/student">Create student</Link>
              </div>
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th className="float-right">Actions</th>
                  </tr>
                </thead>
                  <tbody>
                  {
                  this.state.data.map(function (row, key) {
                    return (<tr key={key}>
                      <td>{row.name}</td>
                      <td>{row.surname}</td>
                      <td className="float-right">
                        <Link className={s.actionIcon} to={'/app/student/'+row.id}>
                          <i className="glyphicon glyphicon-pencil" />
                        </Link>
                        {' '}
                        <span className={s.actionIcon} onClick={event => this.handleClickOpen(row.id)}>
                          <i className="glyphicon glyphicon-trash" />
                        </span>
                      </td>
                    </tr>);
                  }, this)
                  }
                </tbody>
              </Table>
              <Dialog
                  open={this.state.dialog.show}
                  onClose={event => this.handleClose()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete Student"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure that you want delete the student selected?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={event => this.handleClose()} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={event => this.handleClose()} color="primary" autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Students;
