'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
} from 'react-native';
import constants from './constants';

export default class LoginComponent extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={(text) => {
                        this.setState({searchItem: text})
                    }}
                    style={styles.input} placeholder="Search"
                    underlineColorAndroid="transparent"/>
                <TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>
        );
    }

    onSearchPressed() {
        this.props.navigator.push({
            title: constants.SEARCH_DETAIL,
            passProps: {
                searchTerm: this.state.searchItem
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        padding: 10
    },
    input: {
        height: 40,
        width: 340,
        backgroundColor: 'white',
        fontStyle: 'italic',
        borderWidth: 2,
        borderColor: 'cyan',
        marginTop: 20,
        padding: 10,
        fontSize: 16,
        color: 'gray'
    },
    button: {
        height: 40,
        marginTop: 20,
        backgroundColor: 'cyan',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        alignSelf: 'center',
        color: 'white'
    }
});

AppRegistry.registerComponent('LoginComponent', () => LoginComponent);