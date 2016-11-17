import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    ToolbarAndroid,
    TouchableHighlight
} from 'react-native';
import moment from 'moment';

export default class PushPayload extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props == null) return <View><Text>Loading...</Text></View>;
        return (
            <View style={{
                flex: 1,
                paddingTop: 40,
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                {/*<Text>{JSON.stringify(this.props.rowData, 2)}</Text>*/}
                <Image
                    source={{uri: this.props.rowData.actor.avatar_url}}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60
                    }}/>
                <Text style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20
                }}>{moment(this.props.rowData.created_at).fromNow()}</Text>
                    <TouchableHighlight onPress={this.props.navigator.pop}>
                        <Text>Go back</Text>
                    </TouchableHighlight>
            </View>
    );
    }

    }

    AppRegistry.registerComponent('PushPayload', () => PushPayload);