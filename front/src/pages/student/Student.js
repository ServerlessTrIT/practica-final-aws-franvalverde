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
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
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
