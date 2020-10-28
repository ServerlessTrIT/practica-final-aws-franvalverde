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

class Students extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

  handleClickNew () {
    console.log('holaaa');
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
                <button type="button" onClick={event => this.handleClickNew()} className="btn btn-primary">
                  Create student
                </button>
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
                  this.state.data.map(row =>
                      <tr>
                        <td>{row.name}</td>
                        <td>{row.surname}</td>
                        <td className="float-right">
                          <span className={s.actionIcon} onClick={event => this.handleClickEdit(row.id)}>
                            <i className="glyphicon glyphicon-pencil" />
                          </span>
                          {' '}
                          <span className={s.actionIcon} onClick={event => this.handleClickOpen(row.id)}>
                            <i className="glyphicon glyphicon-trash" />
                          </span>
                        </td>
                      </tr>,
                  )
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
