# UFMS_SD_Rest_Api

# Resume:

This web application accomplishes to run a containerized API for register sell orders and it works with a Postgres database also containerized. With this application you will be able to register information related to product, customer, employee, order and item with respective attributes as the following diagram illustrates.

![UML](https://user-images.githubusercontent.com/47990614/139122635-3b30fc61-88d2-4c5a-9a9d-655f79deee1d.png)

Also, this api was developed following the MVC architecture, but using only Model and Controller layers, as the following image:  
![Architecture](https://user-images.githubusercontent.com/47990614/138994475-499596f6-f627-4fec-b0dc-454fb1f031fa.png)
As we can see, the api and database is both conteinerized and they can comunicate with each other by a container's network called 'mynet'. In order to make requests to the api, we just need to use postman and setup the respective request for each specified endpoint.

# Pre-requisites:
In order to run this web application, you need to have installed the following programs:
- Git
- Docker
- Postman Desktop

# Running the application:
There are two ways of run this API in a local machine, the following steps show how to do it:
## 1st. way (if you just want to implement it from docker images):
1) Create a network in docker:
``` docker network create --subnet=172.99.0.0/16 mynet ```
2) Run a Postgres database’s container:
``` docker container run --name postgres --network mynet --ip=172.99.0.2 -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres```
3) Run the Api’s container:
``` docker container run --name orderapi --network mynet -p 3000:3000 -d gustavojeda/orders_rest_api ```

## 2nd. way (if you want to clone this repository and build the api's image):
1) Clone the git remote repository into your local machine:
``` git clone "https://github.com/gustavovespero/node_rest_api" ```
2) Buil a docker image for API. Using terminal go to node_rest_api directory and run the command:
``` docker build -t nodeapi . ```
3) Create a network in docker:
``` docker network create --subnet=172.99.0.0/16 mynet ```
4) Run a Postgres database’s container:
``` docker container run --name postgres --network mynet --ip=172.99.0.2 -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres```
5) Run the Api’s container:
``` docker container run --name api --network mynet -p 3000:3000 -d nodeapi```
