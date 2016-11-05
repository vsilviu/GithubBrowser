'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    TabBar
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import FeedComponent from './FeedComponent';

export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'feed'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    style={{marginTop: 20}}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <FeedComponent tabLabel='Tab #1 asd'/>
                    <Text tabLabel='Tab #2 word word'>favorite</Text>
                </ScrollableTabView>
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

AppRegistry.registerComponent('AppContainer', () => AppContainer);