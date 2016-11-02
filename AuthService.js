import buffer from 'buffer';

class AuthService {
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
			if(response.status >= 200 && response.status < 400) {
				return response.json();
			}
			throw {
					badCredentials: response.status == 401,
					unknown: response.status != 401
				  }
		})
		.then(results => {
			console.log(results);
			return callback({success: true});
		})
		.catch(err => {
			return callback(err);
		})
	}
}

module.exports = new AuthService();