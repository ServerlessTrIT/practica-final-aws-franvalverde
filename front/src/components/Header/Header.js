import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logoutUser } from '../../actions/user';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Header.module.scss';
import 'animate.css'

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.state = {
      visible: true,
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props
      .dispatch(logoutUser());
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar())
  }

  render() {
    return (
      <Navbar className={`d-print-none ${s.root}`}>
        <Nav className="ml-md-0 d-flex nav-responsive">
          <NavItem className={`${s.navItem} text-white`}>
            <span className={`small ${s.accountCheck}`}>Philip smith</span>
          </NavItem>
          <NavItem className={`${s.divider} text-white`} />
          <NavItem>
            <NavLink onClick={this.doLogout} className={`${s.navItem} text-white`} href="#">
              <i className="glyphicon glyphicon-off" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-none">
            <NavLink onClick={this.toggleSidebar} className={`${s.navItem} text-white`} href="#">
              <i className="fa fa-bars" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

