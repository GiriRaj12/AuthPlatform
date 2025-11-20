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