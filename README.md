Frontend hosted on netlify: https://jenkins-radiator.netlify.app/  
Backend hosted on heroku: https://radiator-backend.herokuapp.com/  

Radiator features:  
* Full configurable radiator view using drag and drop edit style
* Groups and jobs are seperated into their own categories that are configurable
* Support for multiple Jenkins instances
* User permissions, manage each user individually

For demo purposes you can either install your own Jenkins to localhost:8080 or use the existing one that has been deployed to Google Kubernetes.  
This project does not use any external css libraries, all css is handmade.

## Purpose
The main purpose of this project is to be a type of a "jenkins extension".  
The idea is to see multiple jobs at once with their status across multiple jenkins platforms, this will give alot more visibility on job failures or just in general to see what the build status of multiple jobs is.  

One good scenario would be testautomation, you would be able to see if you tests are passing or failing from a single page view.

## Main radiator view
![Radiator main view](https://i.gyazo.com/8c961c2a9175c35c8189f814d2c3b19b.png)

In the main radiator view you can see all of the groups and jobs that have been added to the following radiator.  
Each job must be placed in a group, it is not possible to add a job to the radiator without a group.  
  
While editing the radiator using the admin panel you can drag and drop jobs from one group to another and also change the order of groups. (Note that currently its not possible to add a new line on the editor)

Each radiator contains an owner for it, the name can be seen on the admin panel.

## Radiator groups
An empty group can be set to a radiator. The main objective of a group is to categorize the jobs in a general way.  
Each group contains a name and an owner.  

## Radiator Jobs
![Radiator jobs](https://i.gyazo.com/d73e6533df2aea9f5789fb4e8fafc000.png)

Each job contains the maximum build history that the Jenkins api can provide or the maximum amount of squares that will fit inside of a box.  
Each color of a square represents a status:
* Read meaning that the build was unsuccessful
* Yellow meaning that the build was unstable
* Blue meaning that the build has passed

This colorsing scheme was designed to be similar to jenkins

## Permissions
![Permissions panel](https://i.gyazo.com/ae6e8034ce15957638d2d7524faa8629.png)
Here you can see the view when modifying a users permission.  
The initial values of the permissions are shown right away, you must have suficcient permission to modify other users permissions (Note that administrator has all permissions)

## Drag and drop
![Job drag](https://i.gyazo.com/fd7c318bef83e22e94264b0b8bb5e02e.gif)  
The drag and drop functionality used in editor is from atlassian (https://github.com/atlassian/react-beautiful-dnd/), its a well maintained and documented library that is also found in many websites.  

![Group drag](https://i.gyazo.com/13a3db75fe06aad26ad864db2d5289dd.gif)  
This same drag and drop logic applies also to groups, you can sort entire groups by just dragging it to the place you want it and it will automatically save it in backend.  
To access this drag and drop feature you must be in the editor mode of the radiator, that is accomplished by pressing "Options" -> "Edit radiator". In the list of groups and radiators is a link as a name that will let you access the regular radiator view.

## Job creation
![Job creation](https://i.gyazo.com/bc7fc5f622384ab8aee91104af7cce2a.png)  
In the job creation panel you can add a jenkins, if your jenkins is using a token it can also be added. In my case the jenkins is avalible for public use on read mode.

As you can also see you can see there is also a selection on what jenkins instance to use, the radiator does not have to be dependent on only one jenkins.  

## Login
Authentication is done using jsonwebtoken, the token contains user permissions, id and username.  
The permissions part of the token is updated everytime when AdminRouter is rendered, this is done because a token can be stored on the browser but would not be updated unless the client were to login again.  

Only the passwordhash is saved in the backend and then later is compared when the user makes a login.  

In each request to the backend, besides the public api the token is verified and requests proceed according to the users permission levels.  

## Notifications
![Fail notification](https://i.gyazo.com/a18bc5655094d8d70e5d8b0519fbc1ae.png)
![Success notification](https://i.gyazo.com/7f19b0d8b743233f603f888e0fd3878d.png)
![Info notification](https://i.gyazo.com/15b8e2c0967c7104d697eb29b379b510.png)  
Each notification type has its own color, one for fail, success and info. The notifications are also stackable and remove them self after a short period.

## Deployment
This project required a "public" test Jenkins for demo purposes, this whole projects idea is basically to be an extension to a Jenkins.  
The Jenkins that was deployed is running on Googles Kubernetes + NGINX Ingress engine, this required quite alot of configuration and also there were issues with enabling CORS, due to that the backend works as a "proxy" service when making requests to a specific Jenkins api.

![Backend proxy](https://i.gyazo.com/ca40d56ed61108cebf56c34c2f866ba5.png)  
Frontend makes a request to backend and backend then makes a request to Jenkins api to avoid CORS issues.

## Public radiators
In the root of the website you will see a "Welcome" header that contains two links under it, one is for the login to admin panel and one is to see radiators.  
The link to see the radiators only contains the ones that are marked as "public" in the backend. I have enabled one radiator to be like that for demo purpose.

## Things to note
Some planned things were not implemented as I was running out of time, for example deletion of a job, making a radiator avalible for public view or editing the job details. All of these things should be possible to make within a couple of days, in some cases the backend already supports this and changes can be quickly made in mongodb database.  

This is also ment to be a POC type of model, the base infrastructure is pretty much set and adding new features/improvements should be much easier.

Heroku backend may be slow, and the Jenkins instance might need some time to boot if the page hasnt been requested for some time.
