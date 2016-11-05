import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {

    getAuthInfo(cb) {
        //this clears the storage
        // AsyncStorage.clear(err => {
        //     console.log(err);
        // });
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                return cb(err);
            }

            if (!val) {
                return cb();
            }

            const keyArray = [val[0][0], val[1][0]];
            const valueArray = [val[0][1], val[1][1]];

            const zippedObj = _.zipObject(keyArray, valueArray);

            if (!zippedObj[authKey]) {
                return cb();
            }

            var authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObj[authKey]
                },
                user: JSON.parse(zippedObj[userKey])
            };

            return cb(null, authInfo);
        })
    }

    login(creds, callback) {
        const b = new buffer.Buffer(creds.username + ':' + creds.password);
        const encodedAuth = b.toString('base64');

        console.log('Encoded auth is ' + encodedAuth);

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    return response.json();
                }
                throw {
                    badCredentials: response.status == 401,
                    unknown: response.status != 401
                }
            })
            .then(results => {
                AsyncStorage.multiSet([
                    [authKey, encodedAuth],
                    [userKey, JSON.stringify(results)]
                ], (err) => {
                    if (err) {
                        throw err;
                    }
                    return callback({success: true});
                });
            })
            .catch(err => {
                return callback(err);
            })
    }
}

module.exports = new AuthService();