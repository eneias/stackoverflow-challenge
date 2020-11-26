# Gymme app

## Routes

### /login

#### Signin

POST: `/login/`

params: 
```json
{
    username: string,
    password: string
}
```

#### Signup

POST: `/login/signup`

params: 
```json
{
    name: string,
    username: string,
    password: string,
    email: string,
}
```

#### Signout

POST and GET: `/login/signout`

params: 
```json
/* no params */
```

## Users

### List users

GET: `/v1/user`

params: 
```json
/* no params */
```

### Create new user

POST: `/v1/user`

params: 
```json
{
    name: string,
    username: string,
    password: string,
    email: string,
}
```