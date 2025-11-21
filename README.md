# AuthPlatform

A simple and efficient authentication platform built using **Node.js**
and **Redis**.\
This project provides user registration, login, token validation, and
token refresh functionality.

## 🚀 Stack

-   **Node.js** (Express)
-   **Redis** (Cache Database)
-   **JWT** for authentication
-   **Swagger UI** for API documentation

## 📌 API Endpoints

### **1. `/api/user/login`** --- **POST**

Authenticate a user and return a JWT token.

**Payload**

``` json
{
  "email": "email",
  "password": "password"
}
```

**Response**

``` json
{
  "status": 200,
  "message": "Success or error message",
  "data": {
    "token": "JWT token in case of successful login"
  }
}
```

### **2. `/api/user/register`** --- **POST**

Register a new user.

**Payload**

``` json
{
  "email": "proper_email_formatted",
  "password": "Password"
}
```

**Password Requirements** - Minimum **8 characters** - At least **1
special character** - At least **1 number**

**Response**

``` json
{
  "status": 200,
  "message": "Success or error message",
  "data": {
    "message": "Registered successfully, please log in"
  }
}
```

### **3. `/api/user/token/refresh`** --- **GET**

Generate a new token for an authenticated user.

**Headers**

    Authorization: Bearer <token>

**Response**

``` json
{
  "status": 200,
  "message": "Success or error message",
  "data": {
    "token": "Refreshed JWT token"
  }
}
```

### **4. `/api/user/token/validate`** --- **GET**

Validate if a provided token is still active.

**Headers**

    Authorization: Bearer <token>

**Response**

``` json
{
  "status": 200,
  "message": "Success or error message",
  "data": {
    "message": "TOKEN ACTIVE"
  }
}
```

## 📘 Swagger Documentation

Visit `/api/docs` to view the Swagger UI.

## 🛠️ Running the Application

### Prerequisite

Install Docker: https://docs.docker.com/engine/install/

### Start the Application

``` bash
docker-compose up
# or
docker-compose up -d
```

Ensure ports **3000** and **6379** are free.

## 🧪 Testing

1.  Install Postman\
2.  Import **UserAuth.postman_collection.json**\
3.  Test endpoints individually or as a group.

## Use of LLM's 

1. LLM's are used for documentation references as it easier to search and implement examples
2. LLM's are used in this Readme documentaiton mostly to clean up the process not to provide content
3. Code wise - not a copy paste from LLM its mostly written refering documentation exmaples.

## 📩 Contact

For questions: **er.giriraj12@gmail.com**