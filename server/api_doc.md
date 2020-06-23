# KANBAN DOCUMENTATION

> KANBAN is website for task management. This app has :
>
> RESTful endpoint for task's CRUD operation with JSON formatted response
> Technology use for this website:
> Client: Vue Component, Bootstrap
> Server: Postgres,Sequelize, Express

## Restful Endpoints

1. POST : /register
2. POST ; /login
3. POST : /tasks
4. GET : /tasks
5. GET : /tasks/:id
6. PUT : /tasks/:id
7. DELETE : /tasks/:id

## POST /register

Request body:

```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

Response(201 - Created):

```json
{
  "id": "<integer>",
  "email": "<your email>"
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

Response(400 - REGISTERED_FAILED)

```json
{
  "message": "Email already registered"
}
```

Response(400 - INVALID EMAIL REGISTER)

```json
{
  "message": "Failed to registered email!"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## POST /login

Request body:

```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

Response(200 - Ok):

```json
{
  "access_token": "<user token>"
}
```

Response(400 - EMAIL NOT FOUND)

```json
{
  "message": "Email not found please register first!"
}
```

Response(400 - EMAIL PASSWORD ERROR)

```json
{
  "message": "Email and Password not match!"
}
```

Response(400 - AUTH_FAILED)

```json
{
  "message": "Authentication Failed!"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## POST /googleSign

Request body:

```json
{
  "idToken": "id_token"
}
```

Response(200 - Ok):

```json
{
  "access_token": "<your access token>"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## POST /tasks

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request body:

```json
{
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>"
}
```

Response(201 - Created):

```json
{
  "id": "<integer>",
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>",
  "updatedAt": "<date>",
  "createdAt": "<date>"
}
```

Response(400 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## GET /tasks

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request body:
Not Needed

Response(200 - Ok):

```json
[
  {
  "id": "<integer>",
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>",
  "updatedAt": "<date>",
  "createdAt": "<date>"
  },
  {
    ...
  }
]
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## GET /tasks/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params:
id: integer (required)

Request body:
not needed

Response(200 - Ok):

```json
{
  "id": "<integer>",
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>",
  "updatedAt": "<date>",
  "createdAt": "<date>"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## PUT /tasks/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params:
id: integer (required)

Request body:

```json
{
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>"
}
```

Response(200 - OK):

```json
{
  "id": "<integer>",
  "title": "<your task title>",
  "category": "<your task category>",
  "description": "<your task description>",
  "updatedAt": "<date>",
  "createdAt": "<date>"
}
```

Response(500 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## DELETE /tasks/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params:
id: integer (required)

Request body:
not needed

Response(200 - Ok):

```json
{
  "message": "Successfully delete task!"
}
```

Response(500 - SequelizeValidationError)

```json
{
  "message": "Error Validation"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```
