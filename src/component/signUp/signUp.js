import React, {Component} from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import App from "../../App";
import '../../index.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from '@material-ui/core/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import './style.css'
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name: '',
                email: '',
                password: '',
                phone: ''
            },
            message: '',
            isAlertOpen: false
        }
    };

    createAccount() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        firebase.auth().createUserWithEmailAndPassword(this.state.userData.email, this.state.userData.password)
            .then((data) => {
                console.log(data);
                console.log(data.user.uid);
                var userData = this.state.userData;
                userData.id = data.user.uid;
                db.collection('Users').doc(data.user.uid).set(userData);
                this.props.history.push('/login');

            })
            .catch((error) => {
                this.setState({message: error.message, isAlertOpen: true});
            });
        console.log(this.state.userData);
    }

    handleChangeReg(p, e) {
        var userData = this.state.userData;
        userData[p] = e.target.value;
        this.setState({userData: userData})
    }

    login() {
        this.props.history.push('/login')
    }

    close() {
        this.setState({isAlertOpen: false});
    }

    render() {

        return (
            <div className='account'>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">Sign Up</Typography>
                    </Toolbar>
                </AppBar>
                <Card className='card'>
                    <CardContent>
                        <div>
                <TextField label='Name' type="text" value={this.state.userData.name}
                onChange={this.handleChangeReg.bind(this, 'name')}/><br/>
                        </div>
                    </CardContent>
                    <CardContent>
                <div>
                <TextField label='Email' type="text" value={this.state.userData.email}
                onChange={this.handleChangeReg.bind(this, 'email')}/><br/>
                </div>
                    </CardContent>
                    <CardContent>
                        <div>
                <TextField label='Password' type="password" value={this.state.userData.password}
                onChange={this.handleChangeReg.bind(this, 'password')}/><br/>
                        </div>
                    </CardContent>
                    <CardContent>
                        <div>
                <TextField label='Phone Number' type="number" value={this.state.userData.phone}
                onChange={this.handleChangeReg.bind(this, 'phone')}/><br/>
                        </div>
                    </CardContent>
                    <CardContent>
                        <div>
                <Button variant="contained" color="primary" onClick={this.createAccount.bind(this)}>Sign Up</Button>
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

export default SignUp;