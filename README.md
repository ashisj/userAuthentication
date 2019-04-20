# User Authentication using node js
### to create project folder
```
express --no-view
```
### to install dependency
```
npm install
```
### to run the application
```
npm start
or
SET DEBUG=userauthentication:* & npm start
```
### steps in develelopment
1. added login and signup view
2. create an api folder for rest api request
3. add auth.js file for login and signup request


### db query
```
create database users;
use users;
drop table tbl_usees;
create table tbl_users(
						userId int primary key auto_increment,
						name varchar(20) not null,
                        email varchar(20) not null unique,
                        phoneNumber varchar(50) not null unique,
                        password varchar(64) not null
					); 
```					