import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          //common
          "loading": "loading...",
          "save": "Save",
          "username": "Username",
          "password": "Password",
          "login": "Login",
          "administrator": "Administrator",
          "descriptions": "Defenitions to be added.",
          "name": "name",
          "options": "Options",
          "settings": "Settings",
          "edit": "Edit",
          "owner": "Owner",

          //Sidebar
          "home": "Home",
          "groups": "Groups",
          "jobs": "Jobs",
          "accounts": "Accounts",
          "logout": "Log out",

          //Login.js
          "confirmPassword": "Confirm password",
          "firstAndLastName": "First and last name",
          "failedToReigster": "Failed to register",
          "passwordMatchError": "Passwords do not match, please double check.",
          "loginFailError": "Failed to login",
          "missingNameError": "Name is missing.",
          "confirmedPassworddError": "Confirmed password is missing.",
          "missingPasswordError": "Password is missing.",
          "missingUsernameError": "Username is missing.",

          //AdminAccountSettings.js

          "loadingUserSettings": "Loading user settings...",
          "writePermission": "Write permission" ,
          "writeJobs": "Write jobs",
          "writeGroups": "Write Groups",
          "writeRadiators": "Write Radiators",
          "readPermission": "Read permission",
          "readJobs": "Read Jobs",
          "readGroups": "Read Groups",
          "readRadiators": "Read Radiators",
          "otherPermissions": "Other permissions",
          "modifyUsers": "Modify users",


          //AdminAccountsList.js
          "deleteUser": "Delete user",

          //AdminGroupsCreator.js
          "groupCreation": "Group {{group_title}} successfully created",
          "groupCreationFail": "Unable to create group",
          "groupCreationTitle": "Group creation page",
          "groupNameLabel": "Group name:",

          //AdminGroupsList.js
          "groupName": "Group name",
          "editGroup": "Edit group",
          "groupSettings": "Group settings",
          "newGroup": "New group",

          //AdminHome.js
          "radiatorName": "Radiator name",
          "editRadiator": "Edit radiator",
          "radiatorSettings": "Radiator settings",
          "newRadiator": "New radiator",
          "noOwner": "no owner",

          //AdminJobCreator.js
          "jobError": "Please check job details.",
          "jobCreated": "Job {{job_name}} successfully created",
          "jobCreationError": "Unable to create job",
          "jenkinsError": "Please check jenkins details.",
          "jenkinsAdded": "Jenkins {{jenkins_name}} successfully created",
          "jenkinsAddFail": "Unable to add jenkins",
          "createJob": "Create a job",
          "jobName": "Job name",
          "jobPath": "Job path (in jenkins):",
          "searchJenkins": "Search for jenkins:",
          "hostname": "Hostname",
          "addJenkins": "Add a jenkins",
          "jenkinsName": "Jenkins name",
          "jenkinsHostname": "Jenkins hostname",
          "jenkinsPort": "Jenkins Port",
          "jenkinsToken": "Jenkins API token (username:token)\nLeave empty if public jenkins",

          //AdminJobsList.js
          "newJob": "New job",

          //AdminRadiatorCreator.js
          "radiatorCreated": "Radiator {{radiator_name}} successfully created",
          "radiatorCreationFailed": "Unable to create radiator",
          "radiatorCreationPage": "Radiator creation page",

          //AdminRadiatorEditor.js

        }
      }
    },
    lng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;