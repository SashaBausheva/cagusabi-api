Cagusabi Image Hosting API
==========================

Connected Sites
---------------

-   Front-End Repo: <https://github.com/SashaBausheva/cagusabi-client>
-   Application: <https://SashaBausheva.github.io/cagusabi-client>
-   Heroku Site: <https://damp-meadow-38264.herokuapp.com>

Technologies Used (Back End)
-----------------
-   Amazon Web Services (AWS) - Simple Storage Service (S3)
-   JavaScript
-   Express.js
-   MongoDB
-   Mongoose
-   Node.js
-   Heroku
-   cURL
-   JSON

About the Back-End
------------------
The back-end of this application is built in JavaScript utilizing Express.js and the Mongoose object modeling tool on top of MongoDB. Libraries from Amazon Web Services (AWS) serve as the image store via their Simple Storage Service (S3).

Upon upload, the images are placed in a temporary location on the back end. Upon successful upload to the S3 bucket, meta-information (see Models below) is stored in MongoDB hosted by Heroku. Updates of this meta-data are also stored in the MongoDB collections. Deletions do not destroy objects in S3 - only the meta-data in MongoDB is deleted.

_This back end was developed on Ubuntu 18.04.2 LTS and Mac OS X/macOS (El Capitan and later). No Microsoft developers were harmed during the making of this back end._

Development Process
-------------------
This projects is a new and improved version of a former team project. You can find the original project [here](https://github.com/cagusabi/cagusabi-api). The original project was made in 3 days.

This application originated as a team assignment in which a group of General Assembly's Software Engineering Immersive students were tasked with building an application that allows users to upload images onto a virtual file system. All users can view/download images, whereas owners can also remove and edit the images they havd submitted.

The main difficulty we encounted was realizing we needed a strong, functioning front-end foundation to be able to test the file upload process. After having been able to CRUD the database, we then began to build the same calls but now incorporating ownership. We also hit a few road blocks implementing Handlebars, specifically when working with modals. Assigning each upload its own modal was challenging. Once we were able to finally was able to CRUD through the front end, our final goal was making sure the proper messaging appear for the users, and then working on the CSS for the site.

Throughout this project, we were able to experience several different types of team work and team programming. Most often we utilized peer progamming, which allowed us to put two heads together, but we also utilized mob programming for difficult issues, and towards the end, we utilized working together remotely. Throughut the entire process, we stick to the scrum framework, having one standup in the morning to come up with a plan for the day, and one standup at night to go over the our progress.

Entity-Relationship Diagram
---------------------------
The basic entity-relationship diagram is provided below:

![Cagusabi API ERD](./images/cagusabi-api-ERD.png)

Models
------
Below are the basic structure of both the USER and the UPLOAD models used in the back end:

#### USER
| Field          | Type      | Required | Unique | Notes                                  |
|----------------|-----------|----------|--------|----------------------------------------|
| email          | String    | true     | true   |                                        |
| hashedPassword | String    | true     | true   |                                        |
| token          | String    | true     |        |                                        |
| timestamps     | timestamp |          |        | Populated automatically                |
| toObject       | Object    |          |        | Removes hashed password upon retrieval |

#### UPLOAD
| Field       | Type                           | Required | Notes                   |
|-------------|--------------------------------|----------|-------------------------|
| name        | String                         | false    |                         |
| url         | String                         | true     |                         |
| description | String                         | false    |                         |
| owner       | mongoose.Schema.Types.ObjectId | true     | References User         |
| email       | String                         | true     |                         |
| tags        | String                         | false    |                         |
| timestamps  | timestamp                      |          | Populated automatically |

_No fields in the UPLOAD model are unique._

Routes
------
The RESTful routes are described below.
#### USER
| Action | URI Pattern      | Method/Action               |
|--------|------------------|-----------------------------|
| POST   | /sign-up         | app.post()/sign-up          |
| POST   | /sign-in         | app.post()/sign-in          |
| PATCH  | /change-password | app.patch()/change-password |
| DELETE | /sign-out        | app.delete()/sign-out       |

#### UPLOAD
| Action | URI Pattern      | Method/Action               |
|--------|------------------|-----------------------------|
| POST   | /uploads         | app.post()/create           |
| GET    | /uploads         | app.post()/index            |
| PATCH  | /uploads/:id     | app.patch()/update          |
| DELETE | /uploads/:id     | app.delete()/destroy        |

Basic Directory Structure
-------------------------
Below are listed the _relevant_ directories and files for the application - not all objects are listed.
```
app/models
```
-   ```user.js``` - the model for the USER object
-   ```upload.js``` - the model for the UPLOAD object

```
app/routes
```
-   ```user_routes.js``` - contains the application code for USER routes
-   ```upload_routes.js``` - contains the application code for UPLOAD routes

```
config
```
-   ```db.js``` - the basic MongoDB database configuration

```
curl-scripts/auth
```
-   ```change-password.sh``` - script for testing change password
-   ```sign-in.sh``` - script for testing sign in
-   ```sign-out.sh``` - script for testing sign out
-   ```sign-up.sh``` - script for testing sign in

```
curl-scripts/upoads
```
-   ```create.sh``` - script for testing meta-data create
-   ```destroy.sh``` - script for testing meta-data deletion
-   ```index.sh``` - script for testing meta-data index
-   ```update.sh``` - script for testing meta-data update

```
images
```
This directory stores the images used in this document.
```
lib
```
-   ```auth.js``` - application library for authentication functionaity
-   ```custom_errors.js``` - application library for error functionality
-   ```error_handler.js``` - application library for error functionality
-   ```promiseS3Upload.js``` - application library for Upload/AWS

```
tempFiles
```
This directory stores the basic images before upload to AWS S3.
