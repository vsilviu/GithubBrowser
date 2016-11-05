'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    ListView,
    ActivityIndicator
} from 'react-native';
import AuthService from './AuthService';

export default class FeedComponent extends Component {

    componentDidMount() {
        this.fetchFeed();
    }

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: dataSource,
            loading: true
        }
    }

    fetchFeed() {
        AuthService.getAuthInfo((err, authInfo) => {
            console.log(authInfo);
            const url = 'https://api.github.com/users/' + authInfo.user.login + '/received_events';
            fetch(url, {
                headers: authInfo.header
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    this.setState({loading: false});
                    const feedItems = responseData.filter(ev => ev.type == 'PushEvent');
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(feedItems)});
                })
        })
    }

    //how does the rowData argument get here??
    renderRow(rowData) {
        console.log(rowData);
        {/*return <Text>{JSON.stringify(rowData, 2)}</Text>;*/
        }
        return <Text>{rowData.actor != null ? rowData.actor.login : 'Loading...'}</Text>;
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator animating={true} size="large"/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    }
});

AppRegistry.registerComponent('FeedComponent', () => FeedComponent);