import React, {Component} from 'react';
import firebase from 'firebase'
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import './style.css'
import Dashboard from "./dashboard";
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class DashboardT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalData: {},
            animalID: '',
            order: 0,
            totalOrder: 0,
            dataOrder: {},
            userData: {},
            orders: []
        };
        this.loadUserData();
    }

    componentWillReceiveProps(nextProps) {
        var animalData = nextProps.animalData;
        this.setState({animalData: animalData, animalID: animalData.id});
        {this.state.animalID ? this.loadData() : 'HELLO'}
    }

    sendOrder() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        // this.loadData();
        var participater = {};
        var userID = localStorage.getItem('userId');
        console.log(userID);
        // var totalOrder = this.state.orders[0].totalOrder || 1;
        var totalOrder = this.state.totalOrder ;
        var animalID = this.state.animalID;
        this.state.totalOrder != 7 ? ++this.state.totalOrder : alert('Not available');
        // totalOrder != 7 ? ++totalOrder : alert('Not available');
        console.log(totalOrder);
        this.setState({totalOrder: totalOrder});
        console.log(this.state.totalOrder);
        console.log(this.state.userData);
        db.collection('orders').add({
            userID: userID,
            userName : this.state.userData.name,
            userPhone : this.state.userData.phone || null,
            animalID: animalID,
            order: 1,
            totalOrder: this.state.totalOrder,
            time: Date.now(),
            status : 'PENDING'
        });
    }

    loadUserData() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var userID = localStorage.getItem('userId');
        db.collection('Users').doc(userID).get().then((user) => {
            var userData = user.data();
            console.log(userData);
        this.setState({userData: userData});
    });
    }

    loadData() {
        var arr = [];
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var animalID = this.state.animalID;
        db.collection('orders').where('animalID', '==', animalID).get().then((order) => {
            order.forEach((orders) => {
                var orderS = orders.data();
                orderS.orderID = orders.id;
                arr.push(orderS);
                this.setState({orders: arr })
            });
            console.log(this.state.orders );
        })
    }


    render() {
        return (
            <div>
                <div style={{width: '600px', marginLeft: '100px', position: 'fixed'}}>
                    <Card>
                        <CardContent><Typography>Animal : {this.state.animalData.animal}</Typography></CardContent>
                        <CardContent>Color : {this.state.animalData.color}</CardContent>
                        <CardContent>Age : {this.state.animalData.age}</CardContent>
                        <CardContent>Description : {this.state.animalData.description}</CardContent>
                        <CardContent style={{textAlign: 'right'}}><Button variant="contained" color="primary"
                        onClick={this.sendOrder.bind(this)}>Send Order</Button></CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default DashboardT;
//c user myDocument egdownload