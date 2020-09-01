# KitchenZoom (Canteen Management System) Backend


## Setup instructions

### Server

- #### Step 1 (optional but recommended)

  Create a python virtual environment by using virtualenv or conda

  ```bash
  conda create -n environment python3.6
  ```

  or

  ```bash
  python -m venv environment && source venv/bin/activate
  ```

- #### Step 2

  Clone this repo

  ```bash
  git clone https://github.com/Vishnu44d/canteenzoom.git && cd environment
  ```

- #### Step 3
  Install dependencies
  ```bash
  pip install -r requirements.txt
  ```
- #### Step 4
  - running the server
    ```bash
      python server.py
    ```

## Api

The Api end points are `'\'`

- ### Adding a new user-- url: /user/register

```javascript
{
	"email": "vishnu44d@gmail.com",
	"name":"name",
	"isVeg":false,
	"phone":"9090909090",
	"reg_id":"9090",
	"sic_id":"8080",
	"role":"admin",
	"password":"abcd12345"
}
```

- ### Login user-- url: /user/login

```javascript
{
	"email": "test995@canteenzoom.com",
	"password": "password995"
}
```

- ### Get User Detail-- url: /user/

```javascript
{
	"token": "your token here"
}
```
- ### Update User Detail-- url: /user/update
  ##### mark the field as null which you don't want to update

```javascript
{
	"name":"xyz2",
	"phone":null,
	"password":null,
	"isVeg": true,
	 "token": "your token here"
}
```
