'use strict';

import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';

import AuthService from './AuthService';

export default class LoginComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}


	render() {

		var errorCtrl = <View />;
		
		if(!this.state.success && this.state.badCredentials) {
			errorCtrl = <Text style={styles.error}>Your credentials are wrong</Text> 
		}
		if(!this.state.success && this.state.unknown) {
			errorCtrl = <Text style={styles.error}>Something went wrong!</Text> 
		}	

		return (
			<View style={styles.container}>
				<Image 
				  style={styles.logo} 
				  source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
				<Text style={styles.heading}>Perversa</Text>
				<TextInput 
				  onChangeText={(text) => {this.setState({username: text})}}
				  style={styles.input}
				  placeholder="Username..." 
				  underlineColorAndroid="transparent" />
				<TextInput 
				  onChangeText={(text) => {this.setState({password: text})}} 
				  style={styles.input} placeholder="Password..." 
				  underlineColorAndroid="transparent" 
				  secureTextEntry={true} />
				<TouchableHighlight style={styles.button} onPress={this.onLoginPress.bind(this)}>
					<Text style={styles.buttonText} >Log in</Text>
				</TouchableHighlight>
			    {/* Android issue with ActivityIndicator: https://github.com/facebook/react-native/issues/9023
			        This is the workaround */}
				{this.state.loading &&
					<ActivityIndicator 
					  style={styles.loading} 
					  size="large" />
				}
				{errorCtrl}
			</View>
			);
	}

	onLoginPress() {
		console.log("Attempting to login with username " + this.state.username +
			" and password " + this.state.password);
		this.setState({loading: true});

		AuthService.login({
			username: this.state.username,
			password: this.state.password
		}, (results) => {
			this.setState(Object.assign({
				loading: false
			}, results));
			if(results.success && this.props.onLogin) {
				this.props.onLogin();
			}
		})
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	}, 
	logo: {
		width: 66,
		height:66
	},
	heading: {
		fontSize: 25,
		color: 'black'
	},
	input: {
		height:40,
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
		height:40,
		marginTop:20,
		backgroundColor: 'cyan',
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		alignSelf: 'center',
		color: 'white'
	},
	loading: {
		marginTop: 20
	},
	error:{
		color:'red'
	}
})

AppRegistry.registerComponent('LoginComponent', () => LoginComponent);