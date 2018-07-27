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
            dataOrder: {}
        }

    }

    componentWillReceiveProps(nextProps) {
        var animalData = nextProps.animalData;
        this.setState({animalData: animalData, animalID: animalData.id});

    }

    sendOrder() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        // this.loadData();
        var participater = {};
        var userID = localStorage.getItem('userId');
        console.log(userID);
        var animalID = this.state.animalID;
        this.state.totalOrder != 7 ? ++this.state.totalOrder : alert('Not available');
        var totalOrder = this.state.totalOrder;
        console.log(totalOrder);
        this.setState({totalOrder: totalOrder});
        console.log(this.state.totalOrder);
        participater.userID = userID;
        participater.animalID = animalID;
        participater.order = 1;
        participater.totalOrders = this.state.totalOrder;
        participater.time = Date.now();
        // console.log(participater);
        db.collection('orders').add({participater});
    }

    loadData() {
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var animalID = this.state.animalID;
        console.log(animalID);
        db.collection('orders').get().then((order)=>{
           order.forEach((orders)=>{
               console.log(orders.data());
           })
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