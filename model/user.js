function createUserModel(dbConnection) {
    return {
    viewAllUsers: () =>
        new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM users', (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        }),
    getUser: id =>
        new Promise((resolve, reject) => {
            dbConnection.query(
                `SELECT * FROM users WHERE id = ${id}`,
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                },
            );
        }),
    createUser: data =>
        new Promise((resolve, reject) => {
            dbConnection.query(
                'INSERT INTO users SET ?',
                Object.assign({}, data),
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        }),
    delUser: id =>
        new Promise((resolve, reject) => {
            dbConnection.query(
                `DELETE FROM users WHERE id = ${id}`,
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                },
            );
        }),
    updateUser: (id, user) => {
        const { name, username, password } = user;
        new Promise((resolve, reject) => {
            dbConnection.query(
                'UPDATE users SET name = ?, username = ?, password = ? WHERE id = ?',
                [name, username, password, id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                },
            );
        });
    },
};
}
module.exports = createUserModel;