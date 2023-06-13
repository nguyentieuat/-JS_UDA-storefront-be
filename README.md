# Storefront Backend Project

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 
![Alt text](image-10.png)

## Getting Started
Start app with `npm run start`,
After start up, the server will start on port `8080` and the database on port `5432`

Access http://localhost:8080 to has instruction
![Alt text](image-1.png)

(token can to use: eyJhbGciOiJIUzI1NiJ9.Mg.s0bq9zBGOBHjWqrcTnVjCxh_2K8q0bJI9jrQDa-Itks)
## Dependencies
![Alt text](image-2.png)

## Steps to Completion
### Create database
![Alt text](image-3.png)

### Migrate Database
![Alt text](image-4.png)

Relationship between orders and products
![Alt text](image-11.png)

### Models
![Alt text](image-5.png)

### Express Handlers
![Alt text](image-6.png)


## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```
or as paramater ok too.
![Alt text](image-7.png)

## Testing
Run test with `npm run test`
Result test
![Alt text](image-8.png)

result register
![Alt text](image-9.png)


