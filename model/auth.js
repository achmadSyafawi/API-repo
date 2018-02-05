const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const certificate = 'topsecret'
function createAuthModel(dbConnection) {
    return {
        login: (username, password) => 
        new Promise((resolve, reject) => {
            dbConnection.query(
                `SELECT * FROM dbTable WHERE username = ${username} AND password = ${password}`, 
                (err, result) => {
                    if (err) reject(err);
                    if (result && result.length === 1) {
                        const token = jwt.sign(
                            {
                                exp: Math.floor(Date.now()/1000) + 60 * 60,
                                username: result[0].username,
                            },
                            certificate,
                        );
                        return resolve({ token });
                    }
                },
            );
        }),

        cekToken: token => 
        new Promise ((resolve, reject) => {
            jwt.verify(token, certificate, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        }),
    };
}

module.exports = createAuthModel;