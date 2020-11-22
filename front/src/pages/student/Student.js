import React from 'react';
import Widget from '../../components/Widget';
import s from './Student.module.scss';
import {Link} from "react-router-dom";
import {Row, Col} from "reactstrap";

class Student extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'New Student',
      studientId: props.match.params.id,
      name: '',
      surname: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
      editMode: false,
      headerRequest: {
        'Content-Type': 'application/json',
        'x-api-key': 'GjftIFzE898KGPBGoRmc18Szrm3dP5h7RjvFFg19',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData'))['token']
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.studientId !== '' && this.state.studientId !== 'undefined' && typeof this.state.studientId !== 'undefined') {
      this.setState({editMode: true });
      this.getStudent();
    }
  }

  getStudent () {
    const requestOptions = {
      method: 'GET',
      headers: this.state.headerRequest
    }
    let url = 'https://g1mmrc3a5f.execute-api.eu-central-1.amazonaws.com/prod/users/' + this.state.studientId;
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => this.setDatafromResponse(data))
        .catch(function() {
          document.getElementById('logoutBtn').click();
        });
  }

  setDatafromResponse (response) {
    this.setState({name: response.item.name });
    this.setState({surname: response.item.surname });
    this.setState({city: response.item.city });
    this.setState({state: response.item.state });
    this.setState({zip: response.item.zip });
    this.setState({email: response.item.email });
    this.setState({phone: response.item.phone });
  }

  uuidv4Generator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleChange(event) {
    let property = {name: event.target.value}
    switch (event.target.name) {
      case 'surname':
        property = {surname: event.target.value}
        break;
      case 'city':
        property = {city: event.target.value}
        break;
      case 'state':
        property = {state: event.target.value}
        break;
      case 'zip':
        property = {zip: event.target.value}
        break;
      case 'email':
        property = {email: event.target.value}
        break;
      case 'phone':
        property = {phone: event.target.value}
        break;
      default:
        property = {name: event.target.value}
        break;
    }
    this.setState(property);
  }

  handleSubmit(event) {
    event.preventDefault();
    let createAction = true;

    if (createAction) {
      let uuid = this.uuidv4Generator();

      const requestOptions = {
        method: 'POST',
        headers: this.state.headerRequest,
        body: JSON.stringify({
          id: (this.state.editMode) ? this.state.studientId : uuid,
          name: this.state.name,
          surname: this.state.surname,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          email: this.state.email,
          phone: this.state.phone
        })
      }
      let url = 'https://g1mmrc3a5f.execute-api.eu-central-1.amazonaws.com/prod/users';
      fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => this.successSave())
          .catch(function() {
            document.getElementById('logoutBtn').click();
          });
    }
  }

  successSave() {
    window.location.href = window.location.origin + '/#/app/students';
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          {(this.state.studientId > 0) ? 'name' : this.state.title}
        </h2>
        <Row>
          <Col>
            <Widget>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="col-12 text-right">
                    <Link className="btn btn-outline-light" to="/app/students">Cancel</Link>
                    {' '}
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                  <div className="col-6 pt-3">
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        className="form-control"
                        placeholder="Name"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-6 pt-3">
                    <input
                        type="text"
                        name="surname"
                        value={this.state.surname}
                        className="form-control"
                        placeholder="Surname"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-6 pt-3">
                    <input
                        type="text"
                        name="city"
                        value={this.state.city}
                        className="form-control"
                        placeholder="City"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-3 pt-3">
                    <input
                        type="text"
                        name="state"
                        value={this.state.state}
                        className="form-control"
                        placeholder="State"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-3 pt-3">
                    <input
                        type="text"
                        name="zip"
                        value={this.state.zip}
                        className="form-control"
                        placeholder="Zip"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-6 pt-3">
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        className="form-control"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-6 pt-3">
                    <input
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        className="form-control"
                        placeholder="Phone"
                        onChange={this.handleChange}
                    />
                  </div>
                </div>
              </form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Student;
