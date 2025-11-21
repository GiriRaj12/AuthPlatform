## AuthPlatform
Basic Authentication Platform

Stack : 
 - Node JS (express)
 - DB (redis (cache-db))

#### APIS : 

1. /api/user/login [POST]

    Payload:

        body: {
            email: 'email',
            password: 'password'
        }
    
    Response:


2. /api/user/register [POST]

    Payload:

        body: {
            'email': 'proper_email_formated_email',
            'password' : 'Password' // At-least 8 characters, with one special character and one number
        }

3. /api/user/token/refresh [GET] 

    Headers
        Authorization: Bearer (Produced Token)

4. /api/user/token/validate [GET] 

    Headers
        Authorization: Bearer (Produced Token)


Please visit -> /api/docs to see the swagger ui.

Running Application Guidance:


#### Pre-Requisit: 
    - install docker (https://docs.docker.com/engine/install/)

#### After:
    - docker-compose up (-d for detached space) Should bring up both api and redis server to serve the application 
    - make sure ports 3000 and 6379 is free in your system to serve redis and application layers


#### To Test : 

1. Install postman 
2. Import Collection [Collection_File](./UserAuth.postman_collection.json)
3. Test Individually or Group vise with Postman 


Thanks for looking into the readme. I hope this works as expected - Please reach out if any er.giriraj12@gmail.com