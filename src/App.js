import React, {Component} from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Login from './component/login/login'
import SignUp from './component/signUp/signUp'
import Dashboard from './component/dashboard/dashboard'
import DashboardT from './component/dashboard/dashboard-two'
import firebase from 'firebase'
import firestore from 'firebase/firestore'

const history = createBrowserHistory();

var config = {
    apiKey: "AIzaSyDVrQX6oUeleINHU3297WSi9R1Gc_GVNoA",
    authDomain: "adding-todo-app-1f9bb.firebaseapp.com",
    databaseURL: "https://adding-todo-app-1f9bb.firebaseio.com",
    projectId: "adding-todo-app-1f9bb",
    storageBucket: "adding-todo-app-1f9bb.appspot.com",
    messagingSenderId: "479455984320"
};
firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path={'/'} component={SignUp}/>
                            <Route exact path={'/sign-up'} component={SignUp}/>
                            <Route exact path={'/login'} component={Login}/>
                            <Route exact path={'/dashboard'} component={Dashboard}/>
                            <Route exact path={'/dashboard-part2'} component={DashboardT}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
