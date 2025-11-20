# AuthPlatform
Basic Authentication Platform


APIS : 

1. /api/login [POST]

    Payload:

        body: {
            email: 'email',
            password: 'password'
        }
    
    Response:


2. /api/register [POST]

    Payload:

        body: {
            'email': 'proper_email_formated_email',
            'password' : 'Password' // At-least 8 characters, with one special character and one number
        }

3. /api/token/refresh [GET] 

    Headers
        Authorization: Bearer (Produced Token)


Please visit -> /api/docs to see the swagger ui.

Running Application Guidance:

Pre-Requisit: 
    - install docker 

After:
    - docker-compose up should bring up both api and redis server to server the application 
    - make sure ports 3000 and 6379 is free in your system to serve redis and application layers
