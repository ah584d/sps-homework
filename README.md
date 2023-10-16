<img src="pictures/blue-house.avif" align="right" width="200" height="129" style="background-color:white;"/>

## SPS
> A full stack real estate web application , whith NestJS, RecatJS and MongoDB

## Features

1. FE with react in Typescript, using Tailwind, and with protected routes

2. BE with nestJS, authentication using JWT, REST API routes protected
   
3. Mongo db 


## Left over

1. I used RESTApi instead of graphQL
2. Infinite scroll for FE was not implemented
3. 

## Reasons Behind Technical Choices
1. I invest a lot of time searching some houses pictures and host them online somewhere, so I did not implemented infinite scroll in the front end, because I did not have enought house to make a large scrolling

2. Password is not encrypted, I passed it as clear text in the API, thing that I won't do in Prod level, this is a shortcut for the demo
3. 

## Installation
### Mongo
1. docker pull mongo:latest
2. docker run -d --name mongodb -p 27017:27017 mongo
3. docker ps
4. docker exec –it mongodb mongosh
5. db.runCommand({hello:1})
   
### FE
1. make sure you run with node 18 and above
2. git clone git@github.com:ah584d/sps-homework.git
3. cd fe
4. npm ci
5. npm run dev
6. open "http://localhost:5173/"

### BE
1. cd mongo
2. npm run start:dev
   
## Usage

1. list of users, USER and ADMIN will be shared by email



