Frontend hosted on netlify: https://jenkins-radiator.netlify.app/  
Backend hosted on heroku: https://radiator-backend.herokuapp.com/  

Radiator features:  
* Full configurable radiator view using drag and drop edit style
* Groups and jobs are seperated into their own categories that are configurable
* Support for multiple jenkins instances
* User permissions, manage each user individually

For demo purposes you can either install your own jenkins to localhost:8080 or use the existing one that has been deployed to Google Kubernetes.  
This project does not use any external css libraries, all css is handmade.

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

Each job contains the maximum build history that the jenkins api can provide or the maximum amount of squares that will fit inside of a box.  
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

## Notifications
![Fail notification](https://i.gyazo.com/a18bc5655094d8d70e5d8b0519fbc1ae.png)
![Success notification](https://i.gyazo.com/7f19b0d8b743233f603f888e0fd3878d.png)
![Info notification](https://i.gyazo.com/15b8e2c0967c7104d697eb29b379b510.png)  
Each notification type has its own color, one for fail, success and info. The notifications are also stackable and remove them self after a short period.

## Deployment
This project required a "public" test jenkins for demo purposes, this whole projects idea is basically to be an extension to a jenkins.  
The jenkins that was deployed is running on Googles Kubernetes + nginx ingress engine, this required quite alot of configuration and also there were issues with enabling cors, due to that the backend works as a "proxy" service when making requests to a specific jenkins api.

## Public radiators
In the root of the website you will see a "Welcome" header that contains two links under it, one is for the login to admin panel and one is to see radiators.  
The link to see the radiators only contains the ones that are marked as "public" in the backend. I have enabled one radiator to be like that for demo purpose.

## Things to note
Some planned things were not implemented as I was running out of time, for example deletion of a job, making a radiator avalible for public view or editing the job details. All of these things should be possible to make within a couple of days, in some cases the backend already supports this and changes can be quickly made in mongodb database.  

This is also ment to be a POC type of model, the base infrastructure is pretty much set and adding new features/improvements should be much easier.
