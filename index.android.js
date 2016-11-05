/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Login from './LoginComponent';
import AuthService from './AuthService';
import AppContainer from './AppContainer';

export default class GithubBrowser extends Component {

    componentDidMount() {
        AuthService.getAuthInfo((err, authInfo) => {
            this.setState({
                checkingAuth: false,
                isLoggedIn: authInfo != null
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            checkingAuth: true
        };
        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        if (this.state.checkingAuth) {
            return <ActivityIndicator animating={true} size="large" style={styles.loader}/>
        }
        if (this.state.isLoggedIn) {
            return <AppContainer />
        }
        return (
            <Login onLogin={this.onLogin}/>
        );
    }


    onLogin() {
        this.setState({
            isLoggedIn: true
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
