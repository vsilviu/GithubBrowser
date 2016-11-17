import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    TouchableHighlight,
    Text
} from 'react-native';

export default class SearchResultComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 40,
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <TouchableHighlight onPress={this.props.navigator.pop}>
                    <Text>{this.props.searchTerm}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

AppRegistry.registerComponent('SearchResultComponent', () => SearchResultComponent);