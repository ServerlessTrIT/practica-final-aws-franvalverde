import React from 'react';
import {
  Row,
  Col,
  Progress,
} from 'reactstrap';
import Widget from '../../components/Widget';
import Calendar from './components/calendar/Calendar';
import s from './Dashboard.module.scss';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={4} xs={12}>
            <Widget
              title={<h6> USERBASE GROWTH </h6>}
              close settings
            >
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Growth</h6>
                  <p className="value">76.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Montly</h6>
                  <p className="value">10.38%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">3.38%</p>
                </div>
              </div>
              <Progress color="success" value="60" className="bg-custom-dark progress-xs" />
              <p>
                <small>
                  <span className="circle bg-default text-white">
                    <i className="fa fa-chevron-up" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;17% higher</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={4} xs={12}>
            <Widget
              title={<h6> TRAFFIC VALUES </h6>}
            >
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Values</h6>
                  <p className="value">17 567 318</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Montly</h6>
                  <p className="value">55 120</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">9 695</p>
                </div>
              </div>
              <Progress color="danger" value="60" className="bg-custom-dark progress-xs" />
              <p>
                <small><span className="circle bg-default text-white"><i className="fa fa-chevron-down" /></span></small>
                <span className="fw-semi-bold">&nbsp;8% lower</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={4} xs={12}>
            <Widget title={<h6>Calendar</h6>} bodyClass={"pt-2 px-0 py-0"}>
              <Calendar />
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
