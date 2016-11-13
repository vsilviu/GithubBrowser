import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    ToolbarAndroid,
    TouchableHighlight} from 'react-native';

export default class PushPayload extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props == null) return <View><Text>Loading...</Text></View>;
        return (
            <View>
                {/*<Text>{JSON.stringify(this.props.rowData, 2)}</Text>*/}
                {/*<Image source={{uri: this.props.rowData.actor.avatar_url}} />*/}
                <TouchableHighlight onPress={this.props.navigator.pop}>
                    <Text>Go back</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

AppRegistry.registerComponent('PushPayload', () => PushPayload);