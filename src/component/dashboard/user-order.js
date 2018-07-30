import React, {Component} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import firebase from "firebase";
import Button from '@material-ui/core/Button';


class UserOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userOrders: []
        };
        this.loadUserOrders();

    }

    loadUserOrders() {
        var arr = [];
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var userID = localStorage.getItem('userId');
        db.collection('orders').where('userID', '==', userID).onSnapshot((orders) => {
            orders.docChanges().forEach((order) => {
                var userOrders = order.doc.data();
                userOrders.orderID = order.doc.id;
                arr.push(userOrders);
                this.setState({userOrders: arr})
            })
        })
    }

    statusUpdate(orders) {
        this.db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.db.settings(settings);
        var orderData = orders;
        orderData.status = 'ORDER_CANCELED!';
        console.log(orderData);
        this.db.collection('orders').doc(orderData.orderID).update(orderData);
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', width: '75%'}}>

                    {this.state.userOrders.map((orders) => {
                        return (
                            <div>
                                <h2>MY_ORDERS</h2>
                                <Card>
                                    <CardContent>{orders.animalID}</CardContent>
                                    <CardContent>{orders.order}</CardContent>
                                    <CardContent> {new Date(orders.time).toLocaleString()}</CardContent>
                                    <div style={{textAlign: 'center'}}>
                                        <Button variant="contained" color="primary" onClick={this.statusUpdate.bind(this, orders)}>CANCEL</Button>
                                    </div>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default UserOrders;