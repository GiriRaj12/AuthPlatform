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
        body: {
            "status" : HTTP_STATUS_CODE ( 200, 401, 400),
            "message" : "ERROR MESSAGE IN CASE OF NOT 200,
            "data" : {
                "token" : "JWT Token in case of successfull login"
            }
        }


2. /api/user/register [POST]

    Payload:

        body: {
            'email': 'proper_email_formated_email',
            'password' : 'Password' // At-least 8 characters, with one special character and one number
        }
    
    Response: 
        body: {
            "status" : HTTP_STATUS_CODE ( 200, 401, 400),
            "message" : "ERROR MESSAGE IN CASE OF NOT 200,
            "data" : {
             "message": "Registered successfully please login in " in terms of 200 (OK)   
            }
        }

3. /api/user/token/refresh [GET] 

    Headers
        Authorization: Bearer (Produced Token)
    
    Response: 
        body: {
            "status" : HTTP_STATUS_CODE ( 200, 400),
            "message" : "ERROR MESSAGE IN CASE OF NOT 200,
            "data" : {
             "token": "Refreshed new token"  
            }
        }

4. /api/user/token/validate [GET] 

    Headers
        Authorization: Bearer (Produced Token)
    
    Response: 
        body: {
            "status" : HTTP_STATUS_CODE ( 200, 400),
            "message" : "ERROR MESSAGE IN CASE OF NOT 200,
            "data" : {
                "message": "TOKEN ACTIVE"  
            }
        }


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