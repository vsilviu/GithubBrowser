'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    ListView,
    ActivityIndicator,
    Image,
    TouchableHighlight
} from 'react-native';
import AuthService from './AuthService';
import moment from 'moment';
import PushPayload from './PushPayload';

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

    pressRow(rowData) {
        this.props.navigator.push({
            title: 'Detail',
            passProps: {
                rowData: rowData
            }
        });
    }

    //how does the rowData argument get here??
    renderRow(rowData) {
        {/*return <Text>{JSON.stringify(rowData, 2)}</Text>;*/
        }
        return (
            <TouchableHighlight onPress={this.pressRow.bind(this, rowData)}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: 'blue',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Image source={{uri: rowData.actor.avatar_url}}
                           style={{height: 36, width: 36, borderRadius: 18}}/>
                    <View style={{paddingLeft: 20}}>
                        <Text>{moment(rowData.created_at).fromNow()}</Text>
                        <Text>
                            <Text style={{fontWeight: '600'}}>{rowData.actor.login} </Text>
                            pushed to
                            <Text>{rowData.payload.ref.replace('refs/heads/', ' ')} </Text>
                            at
                            <Text style={{fontWeight: '600'}}> {rowData.repo.name} </Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
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