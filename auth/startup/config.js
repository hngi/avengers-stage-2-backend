
module.exports = function () {
    if (!process.env.JWT_SECRET_TOKEN) {
        throw new Error('FATAL ERROR: Jwt secret key is undefined!');
    } else if (!process.env.DB_PASSWORD) {
        throw new Error('FATAL ERROR: Database password is undefined!');
    }
}