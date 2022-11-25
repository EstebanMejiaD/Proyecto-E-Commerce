module.exports = {
    database: {
        host: process.env.DB_HOST ||'localhost',
        user: process.env.DB_USER ||'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'database_store',
        port: process.env.DB_PORT || 3306
    }
};

