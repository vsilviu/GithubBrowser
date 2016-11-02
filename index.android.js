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
    View
} from 'react-native';
import Login from './LoginComponent';

export default class GithubBrowser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        var home = <Login onLogin={this.onLogin}/>;
        if (this.state.isLoggedIn) {
            home = <Text> Logged in! </Text>;
        }
        return <View style={styles.container}>{home}</View>;
    }


    onLogin() {
        console.log('gonna mess');
        this.setState({isLoggedIn: true});
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
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
