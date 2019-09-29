module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": "5432",
    "username": "postgres",
    "password": "root",
    "database": "postgres",
    "synchronize": false,
    "dropSchema": false,
    "logging": true,
    "entities": ["src/entity/**/*.entity{.ts,.js}"],
    "migrations": ["src/migration/*.ts"],
    "cli": {
        "migrationsDir": "src/migration"
    }
};
