const config = {
    "database": {
        "host": "mongodb+srv://dbavb786:Avb@90333@taskmanager-e8bqy.mongodb.net/Auth_Db?retryWrites=true&w=majority",
        "default_db_name": "raoLabs",
        "defaults": {
            "createdBy": "SYSTEM",
            "updatedBy": "SYSTEM"
        },
        "default_org_name": "",
        "authentication": true,
        "fetch_secrets": false,
        "user": "dbavb786",
        "pass": "Avb@90333",
        "auth_source": "admin",
        "mongo_options": {
            "useCreateIndex": true,
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            "useFindAndModify": false
        }
    },
    "secret": "COOL_HAI"
}

module.exports = config;