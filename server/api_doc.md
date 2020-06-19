# KANBAN DOCUMENTATION

> KANBAN is website for task management. This app has :
>
> RESTful endpoint for todo's CRUD operation with JSON formatted response

## Restful Endpoints

1. POST : /register
2. POST ; /login
3. POST : /task
4. GET : /task
5. GET : /task/:id
6. PUT : /task/:id
7. DELETE : /task/:id

## POST /register

Request body:

```json
{
  "email": "testing@email.com",
  "password": "test123"
}
```

Response(201 - Created):

```json
{
  "id": 1,
  "email": "testing@email.com"
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
  "email": "testing@email.com",
  "password": "test123"
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
  "idToken": "id_token",
  "audience": "<your client_id>"
}
```

Response(200 - Ok):

```json
{
  "access_token": "<user token>"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## POST /todos

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request body:

```json
{
  "title": "Learning Days",
  "category": "todo",
  "description": "read page 1 to 10"
}
```

Response(201 - Created):

```json
{
  "id": 1,
  "title": "Learning Days",
  "category": "todo",
  "description": "read page 1 to 10",
  "updatedAt": "2020-06-08T14:38:39.104Z",
  "createdAt": "2020-06-08T14:38:39.104Z"
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

## GET /todos

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
    "id": 1,
    "title": "Learning Days 0",
    "category": "done",
    "description": "read page 1 to 10",
    "updatedAt": "2020-06-08T14:38:39.104Z",
    "createdAt": "2020-06-08T14:38:39.104Z"
  },
  {
    "id": 2,
    "title": "Learning Taichi",
    "category": "completed",
    "description": "read page 2 to 10",
    "updatedAt": "2020-06-08T14:38:39.104Z",
    "createdAt": "2020-06-08T14:38:39.104Z"
  }
]
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## GET /todos/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params:

```json
{
  "id": "<item_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
  "id": 1,
  "title": "Learning Days",
  "category": "todo",
  "description": "read page 1 to 10",
  "updatedAt": "2020-06-08T14:38:39.104Z",
  "createdAt": "2020-06-08T14:38:39.104Z"
}
```

Response(500 - INTERNAL SERVER ERROR)

```json
{
  "message": "Internal Server Error"
}
```

## PUT /todos/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params:

```json
{
  "id": "<item_id>"
}
```

Request body:

```json
{
  "title": "Learning Days",
  "category": "todo/done/backlog/completed",
  "description": "read page 1 to 10"
}
```

Response(200 - OK):

```json
{
  "id": 1,
  "title": "Learning Days",
  "category": "todo/done/backlog/completed",
  "description": "read page 1 to 10",
  "updatedAt": "2020-06-20T14:38:39.104Z",
  "createdAt": "2020-06-20T14:38:39.104Z"
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

## DELETE /todos/:id

Request headers:

```json
{
  "access_token": "<your access token>"
}
```

Request params:

```json
{
  "id": "<item_id>"
}
```

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
