# Backend for the newsletter app

## Instructions

The admin interface uses HTTP Basic auth. Both the username and the password needs to be `admin`.
All environment variables need to be set in order to use this service.

## .env shape

```.env
MONGODB_URL="mongodb://<user>:<password>@<host>:27017/"
FRONTEND_URL="<url>"
ACCESS_TOKEN_SECRET="<random string>"
```

## Node modules

### Dependencies

- argon2
- chalk
- cookie-parser
- cors
- express
- jsonwebtoken
- mongoose
- pug
- uuid

### Dev dependencies

- dotenv
- nodemon
