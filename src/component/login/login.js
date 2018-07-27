import React, {Component} from 'react';
import firebase from "firebase";
import TextField from '@material-ui/core/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from '@material-ui/core/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import './style.css'
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                logEmail: '',
                logPassword: ''
            },
            message: '',
            isAlertOpen: false
        }
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.loginData.logEmail, this.state.loginData.logPassword)
            .then((data) => {
                localStorage.setItem('userId', data.user.uid);
                this.props.history.push('/dashboard');

            })
            .catch((error) => {
                this.setState({message: error.message, isAlertOpen: true});
            });
    }

    handleChangeLog(p, e) {
        var loginData = this.state.loginData;
        loginData[p] = e.target.value;
        this.setState({loginData: loginData})
    }

    close() {
        this.setState({isAlertOpen: false});
    }

    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">Login</Typography>
                    </Toolbar>
                </AppBar>
                <Card className='cardLogin'>
                <CardContent>
                    <div>
                <TextField
                    label='Email'
                    type="text"
                    value={this.state.loginData.logEmail}
                    onChange={this.handleChangeLog.bind(this, 'logEmail')}/><br/>
                    </div>
                </CardContent>
                <CardContent>
                    <div>
                <TextField
                   label='Password'
                    type="password"
                    value={this.state.loginData.logPassword}
                    onChange={this.handleChangeLog.bind(this, 'logPassword')}/><br/>
                    </div>
                </CardContent>
                <CardContent>
                    <div>
                <Button variant="contained" color="primary" onClick={this.loginAccount.bind(this)}>Login</Button>
                    </div>
                </CardContent>
                </Card>
                <Dialog
                    actions={<FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.close.bind(this)}/>}
                    modal={false}
                    open={this.state.isAlertOpen}>
                    {this.state.message}
                </Dialog>

            </div>
        )
    }
}
export default Login;