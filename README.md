Frontend hosted on netlify: https://jenkins-radiator.netlify.app/  
Backend hosted on heroku: https://radiator-backend.herokuapp.com/  

Radiator features:  
* Full configurable radiator view using drag and drop edit style
* Groups and jobs are seperated into their own categories that are configurable
* Support for multiple jenkins instances
* User permissions, manage each user individually

For demo purposes you can either install your own jenkins to localhost:8080 or use the existing one that has been deployed to google kubernetes.

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
![Watch the video](https://i.gyazo.com/fd7c318bef83e22e94264b0b8bb5e02e.gif)  
The drag and drop functionality used in editor is from atlassian (https://github.com/atlassian/react-beautiful-dnd/), its a well maintained and documented library that is also found in many websites.
