# Cooking API

[Cooking API Live link](https://cooking-api-pp5-c09a661185b7.herokuapp.com/)


## Table of contents
- [Cooking](#cooking)
  * [Intoduction](#intoduction)
  * [Database](#database)
    + [Data models](#data-models)
      - [**User**](#--user--)
      - [**Profile**](#--profile--)
      - [**Post**](#--post--)
      - [**Like**](#--like--)
      - [**Bookmark**](#--bookmark--)
      - [**Comment**](#--comment--)
      - [**Follower**](#--follower--)
  * [Technologies Used](#technologies-used)
    + [Languages & Frameworks](#languages-frameworks)
    + [Libraries](#libraries)
  * [Testing](#testing)
    + [Manual testing](#manual-testing)
    + [Python validation](#python-validation)
    + [Resolved bugs](#resolved-bugs)
    + [Unresolved bugs](#unresolved-bugs)
  * [Deployment](#deployment)
  * [Credits](#credits)
    + [Resources](#resources)


## Intoduction

This project provides a Django Rest Framework API for the [Cooking React web application](https://github.com/).

Cooking is intended to be a forum for discussion of cooking recipes, techniques and methods, like how to dice a vegetable without losing a finger or how to cooks tough root vegetables like potatoes and carrots to the perfect texture. This social web app provides users with an opportunity to contact and share information about cooking topics and methods.

## Database

### Data models
The following entity relationship diagram was created to represent the custome models implemented for Cooking project:

![Entity Relationship Diagram](documentation/readme_images/ERD_pp5.png)

#### **Profile Model**
* Represents the user profile. Profile instance is created automatically on user registration. 
* This model contain the following fields, Owner, name, content, created_at, updated_at and image
* Owner field has one-to-one relationship with User id field.


#### **Post Model**
* The post model has the following fields: owner, title,content, created_at, updated_at, image and image_filter.
* Owner filed is a ForeignKey for user id.

#### **Like Model**
* This model has the following fields: owner, post and created at.
* Owner and post fields are ForeignKeys for user id and post id respectively. 

#### **Bookmark Model**
* This model has the following fields: owner, post and created at.
* Bookmark model created to save who has add a bookmark(owner) and which post the bookmark has been added.
* Owner and post fields are ForeignKeys for user id and post id respectively. 

#### **Comment Model**
* This model has the following fields: owner, post,content, created at and updated_at.
* Owner and post fields are ForeignKeys for user id and post id respectively.

#### **Follower Model**
* This model has the following fields: owner, followed and created at.
* Owner and followed fields are ForeignKeys.
* Owner is a user that is following other users (following maker).
* Followed is a user that is followed by other users.


## Technologies Used
### Languages & Frameworks
* Python 
* Django / Django Rest Framwork

### Libraries

#### django-cloudinary-storage
* [Cloudinary:](https://cloudinary.com/) Used to store static files/ images
* [dj-allauth:](https://django-allauth.readthedocs.io/en/latest/) Used for user authentication.
* [dj-rest-auth:](https://dj-rest-auth.readthedocs.io/en/latest/introduction.html) Provide auth functionality like login, logout.
* [djangorestframework-jwt:](https://jwt.io/) Provides JSON web token authentication.
* [Psycopg2:](https://www.psycopg.org/docs/) Provides interaction between Python and the PostgreSQL database.
* [ElephantSQL](https://www.elephantsql.com/) Used to provide database hosting service.
* [django-filter](https://django-filter.readthedocs.io/en/stable/) Used to allows users to filter down a queryset based on a model’s fields.
* [django-cors-headers](https://pypi.org/project/django-cors-headers/) Allow a browser to determine if and when cross-domain requests should be allowed.


## Testing

### Manual testing

### Python validation

Code errors and style issues were detected using the Pylance linter in VSCode, and immediately fixed throughout development.
All files containing custom Python code were then validated using the [Code Institute Python Linter](https://pep8ci.herokuapp.com/):

- `drf_api_pp5/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-drf.png">
        <br>
    </details>
- `drf_api_pp5/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls_drf.png">
        <br>
    </details>
- `drf_api_pp5/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer_drf.png">
        <br>
    </details>

- `profiles/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-profiles.png">
        <br>
    </details>
- `profiles/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls-profiles.png">
        <br>
    </details>
- `profiles/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer-profiles.png">
        <br>
    </details>
- `profiles/models.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/models-profiles.png">
        <br>
    </details>


- `posts/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-posts.png">
        <br>
    </details>
- `posts/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls-posts.png">
        <br>
    </details>
- `posts/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer-posts.png">
        <br>
    </details>
- `posts/models.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/models-posts.png">
        <br>
    </details>

- `comments/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-comments.png">
        <br>
    </details>
- `comments/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls-comments.png">
        <br>
    </details>
- `comments/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer-comments.png">
        <br>
    </details>
- `comments/models.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/models-comments.png">
        <br>
    </details>

- `likes/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-likes.png">
        <br>
    </details>
- `likes/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls-likes.png">
        <br>
    </details>
- `likes/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer-likes.png">
        <br>
    </details>
- `likes/models.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/models-likes.png">
        <br>
    </details>

- `bookmarks/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-bookmarks.png">
        <br>
    </details>
- `bookmarks/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls-bookmarks.png">
        <br>
    </details>
- `bookmarks/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer-bookmarks.png">
        <br>
    </details>
- `bookmarks/models.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/models-bookmarks.png">
        <br>
    </details>

- `followers/views.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/views-followers.png">
        <br>
    </details>
- `followers/urls.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/urls-followers.png">
        <br>
    </details>
- `followers/serializers.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/serializer-followers.png">
        <br>
    </details>
- `followers/models.py`: no errors found
    <details><summary>Screenshot</summary>
        <img src="documentation/readme_images/models-followers.png">
        <br>
    </details>

### Resolved bugs


## Deployment
The project was deployed to [Heroku](https://www.heroku.com). To deploy, please follow these steps:

1. To begin with we need to create a GitHub repository from the [Code Institute template](https://github.com/Code-Institute-Org/gitpod-full-template) by following the link and then click 'Use this template'.


2. Fill in the needed details as stated in the screenshot below and then click 'Create Repository From Template'.

3. When the repository creation is done click 'Gitpod' as stated in the screenshot below.


4. Now it's time to install Django and the supporting libraries that are needed. Type the commands below to do this.

* ```pip3 install 'django<4' gunicorn```
* ```pip3 install 'dj_database_url psycopg2```
* ```pip3 install 'dj3-cloudinary-storage```

5. When Django and the libraries are installed we need to create a requirements file.

* ```pip3 freeze --local > requirements.txt``` - This will create and add required libraries to requirements.txt


6. Now it's time to create the project.

* ```django-admin startproject YOUR_PROJECT_NAME .``` - This will create your project

7. When the project is created we can now create the application.

* ```python3 manage.py startapp APP_NAME``` - This will create your application


8. We now need to add the application to settings.py

8. Now it is time to do our first migration and run the server to test that everything works as expected. This is done by writing the commands below.

* ```python3 manage.py migrate``` - This will migrate the changes
* ```python3 manage.py runserver``` - This runs the server. To test it, click the open browser button that will be visible after the command is run.

9. Now it is time to create our application on Heroku, attach a database, prepare our environment and settings.py file and setup the Cloudinary storage for our static and media files.

* Head on to [Heroku](https://www.heroku.com/) and sign in (or create an account if needed).

* In the top right corner there is a button that is labeled 'New'. Click that and then select 'Create new app'.

10. Now it's time to enter an application name that needs to be unique. When you have chosen the name, choose your region and click 'Create app".

11. To add a database to the app you need to go to the resources tab ->> add-ons, search for 'Heroku Postgres' and add it.

12. Go to the settings tab and click on the reveal Config Vars button. Copy the text from DATABASE_URL (because we are going to need it in the next step).

13. Go back to GitPod and create a new env.py in the top level directory. Then add these rows.

* ```import os``` - This imports the os library
* ```os.environ["DATABASE_URL_FROM HEROKU"]``` - This sets the environment variables.
* ```os.environ["SECRET_KEY"]``` - Here you can choose whatever secret key you want.


14. Now we are going to head back to Heroku to add our secret key to config vars. See screenshot below.


15. Now we have some preparations to do connected to our environment and settings.py file. In the settings.py, add the following code:

```import os```

```import dj_database_url```

```if os.path.isfile("env.py"):```

```import env```


16. In the settings file, remove the insecure secret key and replace it with:
```SECRET_KEY = os.environ.get('SECRET_KEY')```

17. Now we need to comment out the old database setting in the settings.py file (this is because we are going to use the postgres database instead of the sqlite3 database).


Now, add the link to the DATABASE_URL that we added to the environment file earlier.

18. Save all your fields and migrate the changes.

```python3 manage.py migrate```

19. Now we are going to get our connection to Cloudinary connection working (this is were we will store our static files). First you need to create a Cloudinary account and from the Cloudinary dashboard copy the API Environment Variable.

20. Go back to the env.py file in Gitpod and add the Cloudinary url (it's very important that the url is correct):

```os.environ["CLOUDINARY_URL"] = "cloudinary://************************"```

21. Let's head back to Heroku and add the Cloudinary url in Config Vars. We also need to add a disable collectstatic variable to get our first deployment to Heroku to work.

22. Let's head back to our settings.py file on Gitpod. We now need to add our Cloudinary Libraries we installed earlier to the installed apps. Here it is important to get the order correct.


23. For Django to be able to understand how to use and where to store static files we need to add some extra rows to the settings.py file.

24. Hang in there, we have just a couple of steps left. Now it's time to link the file to the Heroku templates directory.

25. Let's change the templates directory to TEMPLATES_DIR in the teamplates array.


26. To be able to get the application to work through Heroku we also need to add our Heroku app and localhost to which hosts that are allowed.


27. Now we just need to add some files to Gitpod.

* Create a file called **Procfile* and add the line ```web: gunicorn PROJ_NAME.wsgi?``` to it.

28. Now you can save all the files and prepare for the first commit and push to Github by writing the lines below.

* ```git add .```
* ```git commit -m "Deployment Commit```
* ```git push```


29. Now it's time for deployment. Scroll to the top of the settings page in Heroku and click the 'Deploy' tab. For deployment method, select 'Github'. Search for the repository name you want to deploy and then click connect.

31. Scroll down to the manual deployment section and click 'Deploy Branch'. Hopefully the deployment is successful!

[Back to top](<#table-of-content>)

### How To Fork 

It is possible to do an independent copy of a GitHub Repository by forking the GitHub account. The copy can then be viewed and it is also possible to do changes in the copy without affecting the original repository. To fork the repository, take these steps:

1. After logging in to GitHub, locate the repository. On the top right side of the page there is a 'Fork' button. Click on the button to create a copy of the original repository.

[Back to top](<#table-of-content>)

### Cloning this Project.

To clone and set up this project follow these steps:

1. When you are in the repository, find the code tab and click it.
2. To the left of the green GitPod button, press the 'code' menu. There you will find a link to the repository. Click on the clipboard icon to copy the URL.
3. Use an IDE and open Git Bash. Change directory to the location where you want the cloned directory to be made.
4. Enter the command git clone followed by the copied URL
5. Your clone was created.


[Back to top](<#contents>)

## Credits

### Resources
* Deployment section in Readme file was taken from this [repository](https://github.com/worldofmarcus/project-portfolio-4/blob/main/README.md).

* The API models are inspired from [Code Institute: Django Rest Framework](https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+DRF+2021_T1/courseware/f775d54df4da44d18309888b3fe884f7/a146472df94c4691951c4f58ac43e30e/)
