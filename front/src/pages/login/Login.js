import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser } from '../../actions/user';
import s from './Login.module.scss';

const ValidateRender = () => (
    <div>
        <Alert color="info">Validating the user ...</Alert>
    </div>
)

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    static isAuthenticated(token) {
        if (token) return true;
    }

    constructor(props) {
        super(props);

        this.state = {
            email: 'franvalverde@mailinator.com',
            password: 'Francisco1',
            showSnackbar: false,
            messageSnackbar: '',
            colorSnackbar: 'warning',
            token: '',
            isValidating: false
        };

        this.doLogin = this.doLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    getUrlVars() {
        let vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(m,key,value) {
                vars[key] = value;
        });
        return vars;
    }

    componentDidMount() {
        let username = this.getUrlVars()["username"];
        let code = this.getUrlVars()["code"];
        if (username !== 'undefined' && typeof username !== 'undefined' &&
            code !== 'undefined' && typeof code !== 'undefined') {
            this.setState({ email: username });
            this.setState({ isValidating: true });
            this.validateUser ();
        }
    }

    validateUser () {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'GjftIFzE898KGPBGoRmc18Szrm3dP5h7RjvFFg19'
            },
            body: JSON.stringify({
                username: this.getUrlVars()["username"],
                code: this.getUrlVars()['code']
            })
        }
        let url = 'https://g1mmrc3a5f.execute-api.eu-central-1.amazonaws.com/prod/confirmSignup';
        fetch(url, requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    //window.location.href = window.location.origin;
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(data => this.validationSuccess())
            .catch(function() {
                //catch
            });
    }

    validationSuccess () {
        this.setState({isValidating:false});
        this.showAlert('User verified successfully', 'success');
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    doLogin(e) {
        e.preventDefault();
        let parent = this;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'GjftIFzE898KGPBGoRmc18Szrm3dP5h7RjvFFg19'
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        }
        let url = 'https://g1mmrc3a5f.execute-api.eu-central-1.amazonaws.com/prod/login';
        fetch(url, requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    parent.showAlert('User or password incorrect', 'warning');
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(data => this.loginSuccess(data))
            .catch(function() {
                //catch
            });
    }

    loginSuccess(data) {
        this.props.dispatch(loginUser({ email: this.state.email, password: this.state.password, token: data.token }));
        window.location.href = window.location.origin + '/#/app/students';
    }

    showAlert(msg, color) {
        this.setState({messageSnackbar: msg})
        this.setState({ colorSnackbar: color });
        this.setState({showSnackbar:true},()=>{
            window.setTimeout(()=>{
                this.setState({showSnackbar:false})
            },5000)
        });
    }

    signUp() {
        this.props.history.push('/register');
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login</h3>}>
                        <p className="widget-auth-info">
                            Use your email to sign in.
                        </p>
                        { this.state.isValidating ? <ValidateRender /> : null }
                        <form onSubmit={this.doLogin} className={this.state.isValidating ? s.hideForm: ''}>
                            {
                                this.props.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {this.props.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                <Label for="email">Email</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="email" className="input-transparent pl-3" value={this.state.email} onChange={this.changeEmail} type="email"
                                           required name="email" placeholder="Email"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="password" className="input-transparent pl-3" value={this.state.password}
                                           onChange={this.changePassword} type="password"
                                           required name="password" placeholder="Password"/>
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget auth-widget-footer">
                                <Button type="submit" color="primary" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>
                                  <span className="auth-btn-circle" style={{marginRight: 8}}>
                                    <i className="la la-caret-right"/>
                                  </span>
                                  {this.props.isFetching ? 'Loading...' : 'Login'}
                                </Button>
                                <p className="widget-auth-info mt-4">
                                    Don't have an account? Sign up now!
                                </p>
                                <Link className="d-block text-center mb-4" to="register">Create an Account</Link>
                                <Alert color={this.state.colorSnackbar} isOpen={this.state.showSnackbar}>{this.state.messageSnackbar}</Alert>
                            </div>
                        </form>
                    </Widget>
                </Container>
                <footer className="auth-footer">
                    2020 &copy; Course: Serverless Architecture with AWS
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

