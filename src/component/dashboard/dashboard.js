import React, {Component} from 'react';
import firebase from "firebase";
import DashboardT from './dashboard-two'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animals: [],
            animalData: {}
        };
        this.loadAnimals();
    }


    loadAnimals() {
        var arr = [];
        var db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('animal').onSnapshot((animals) => {
            animals.docChanges().forEach((animalData) => {
                // console.log(animalData);
                var data = animalData.doc.data();
                data.id = animalData.doc.id;
                // console.log(data);
                arr.push(data);
                this.setState({animals: arr})
            });
            // console.log(this.state.animals);
        })
    }

    sendData(animalData) {
        // console.log(animalData);
        this.setState({animalData: animalData})
    }


    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Dashboard</Typography></Toolbar>
                </AppBar>
                <GridList cols={4} cellHeight='auto'>
                    <GridTile cols={1}>
                        <List style={{borderRight: '3px solid #3f51b5' }}>
                            {this.state.animals.map((data , index) => {
                                return (
                                    <div>
                                        <ListItem key={index} onClick={this.sendData.bind(this, data)}>
                                            {data.animal}
                                        </ListItem>
                                    </div>
                                )
                            })}
                        </List>
                    </GridTile>
                    <GridTile cols={3}>
                        {this.state.animalData.id ? <DashboardT animalData={this.state.animalData}/> : null}
                    </GridTile>
                </GridList>
            </div>
        )
    }
}

export default Dashboard;