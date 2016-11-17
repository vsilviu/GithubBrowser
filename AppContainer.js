'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    TabBar,
    Navigator
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import FeedComponent from './FeedComponent';
import PushPayload from './PushPayload';
import SearchComponent from './SearchComponent';
import SearchResultComponent from './SearchResultComponent';
import constants from './constants';

export default class AppContainer extends Component {

    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        switch (route.title) {
            case constants.FEED:
                return <FeedComponent
                    navigator={navigator}
                    title={route.title}
                    {...route.passProps}/>;
            case constants.FEED_DETAIL:
                return <PushPayload
                    navigator={navigator}
                    title={route.title}
                    {...route.passProps}
                />;
            case constants.SEARCH:
                return <SearchComponent
                    navigator={navigator}
                    title={route.title}
                    {...route.passProps}/>;
            case constants.SEARCH_DETAIL:
                return <SearchResultComponent
                    navigator={navigator}
                    title={route.title}
                    {...route.passProps}/>;
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
                    <Navigator
                        tabLabel='Feed'
                        style={{flex: 1}}
                        initialRoute={{title: constants.FEED}}
                        renderScene={this.renderScene.bind(this)}/>
                    <Navigator
                        tabLabel='Search'
                        style={{flex: 1}}
                        initialRoute={{title: constants.SEARCH}}
                        renderScene={this.renderScene.bind(this)}/>
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