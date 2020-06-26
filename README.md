# SWDV 620 2W 20/SU1 Final Project

This web app is a **Full Stack** (Front-End (client) <=> Back-End (servers)). The idea was taken from a code-challenge I had to code once for a hiring company. To that original result, some other features and improvements have been added to better meet with the content of this course. The last section detailed explains the requirement of the WebApp.

Next points describe how was it done and what technologies were used:

- # Front-End

| Core |||| Auxiliar libraries and dependencies: |
| :--------------------- |-|-|-| :--- |
| JavaScript |||| material-ui |
| **ReactJS** |||| csvtojson |
| **ReduxJS** |||| fakerest |
||||| **react-admin** |
||||| react-app-rewired |
||||| react-file-reader |
||||| react-markdown |

### Instructions(webapp)

\> cd swdv-620-web-apps-final-project/ReactJsClient

\> **yarn**

("PORT=4000 react-app-rewired start")

\> yarn **startrwlnx**  

**ETL** is a type of data integration that refers to the three steps **(extract, transform, load)** used to blend data from multiple sources. It's often used to build a data warehouse. During this process, data is taken **(extracted)** from a source system, converted **(transformed)** into a format that can be analyzed, and stored **(loaded)** into a data warehouse or other system. Extract, load, transform **(ELT)** is an alternate but related approach designed to push processing down to the database for improved performance.

- # Back-End

Back-End consist in two separate Restful (**REST APIs**)  microservices servers, Both are pointing to the same MySQL database server and database.

### 1st server NodeJS: 

- #### express (web server)
- #### sequelize (ORM)
- #### mysql2 (mysql driver for nodejs)

### 1st server Instructions:

\> cd swdv-620-web-apps-final-project/NodeServer

\> **npm start**

### 2nd server Java: 

- #### Spring-Boot (web server)
- #### Hibernate (ORM)
- #### JPA, MySQL 

### 2nd server Instructions:

\> cd swdv-620-web-apps-final-project/JavaServer

\> **mvn spring-boot:run**

### Database Server Setup: 

\> docker pull **mysql**

\> docker run --name mysql -p **3406**:3306 -e MYSQL_ROOT_PASSWORD=**mypassword** -d **mysql**

\> mysql -h **localhost** -P **3406** -u **root** -p **mypassword** < **customers.sql**

## code-challenge Description

This project is designed as a quick exercise to gauge a candidate's understanding of general programming knowledge and/or user experience design.

## Terms & Conditions

*Note: Use of third-party plugins other than those defined within project is allowed. But please take into account to demonstrate your strengths and not leave your experience and capabilities to question. No commercial or proprietary plug-ins are allowed.*

Build this project out in the most appropriate way possible.  Treat it as a "real-world component" that will be added into our system.  Feel free to restructure/enhance the project as you see fit. However, you must follow the restrictions described above. Lastly, solutions should be easily built on a standard linux, osx machine or browser.

## The Challenges

### ETL Engineering Challenge

Create a solution to upload data in a single customers table using the mapping
and data files below.

```
etl/map1.csv
etl/data1.csv
etl/map2.csv
etl/data2.csv
```

### Web Service Engineering Challenge

Create a "RESTful" web services to create, read, update, delete and search customers table. *Note: using mysql is optional. The schema is provided for reference purposes only.*

```
ws/customers.sql
```

### JS Engineering Challenge

Create an app to search and view customer data. Use the files below to start.

```
js/customers.json
js/index.html
```

### UI/UX Design Challenge

Create a visual to represent customers dashboard and profile. Execute as though you have full reign on feature scope for each page. Use the files below to start.

```
ui/dashboard.html
ui/profile.html
```