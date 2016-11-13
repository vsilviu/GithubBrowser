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

export default class AppContainer extends Component {

    constructor(props) {
        super(props);
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
                        initialRoute={{title: 'Feed'}}
                        renderScene={(route, navigator) => {
                            console.log(route);
                            switch (route.title) {
                                case 'Feed':
                                    return <FeedComponent
                                        navigator={navigator}
                                        title={route.title}
                                        {...route.passProps}/>;
                                case 'Detail':
                                    return <PushPayload
                                        navigator={navigator}
                                        title={route.title}
                                        {...route.passProps}
                                    />;
                            }
                        }
                        }/>
                    <Text tabLabel='Search'>favorite</Text>
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