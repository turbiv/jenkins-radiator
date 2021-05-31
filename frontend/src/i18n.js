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

          //AdminRouter.js
          "credentialsCheck": "Checking credentials...",
          "oldLogin": "Login as existing user",
          "newLogin": "Register new user",

          //MainPage.js
          "welcome": "Welcome",
          "viewRadiator": "View radiator",
          "adminPanel": "Admin Panel",

          //RadiatorView.js
          "loadingRadiator": "Loading radiator..."



        }
      },
      fi: {
        translation: {
          //common
          "loading": "ladataan...",
          "save": "Tallenna",
          "username": "Käyttäjä",
          "password": "Salasana",
          "login": "Kirjaudu",
          "administrator": "Administrattori",
          "descriptions": "Defenitions to be added.",
          "name": "nimi",
          "options": "Valinnat",
          "settings": "Asetukset",
          "edit": "Muokkaa",
          "owner": "Omistaja",

          //Sidebar
          "home": "Koti",
          "groups": "Ryhmät",
          "jobs": "Työt",
          "accounts": "Tilit",
          "logout": "Kirjaudu ulos",

          "confirmPassword": "Vahvista salasana",
          "firstAndLastName": "Etu- ja sukunimi",
          "FailToReigster": "Rekisteröinti epäonnistui",
          "passwordMatchError": "Salasanat eivät täsmää, tarkista vielä.",
          "loginFailError": "Kirjautuminen epäonnistui",
          "missingNameError": "Nimi puuttuu.",
          "confirmPassworddError": "Vahvistettu salasana puuttuu.",
          "missingPasswordError": "Salasana puuttuu.",
          "missingUsernameError": "Käyttäjätunnus puuttuu.",

          //AdminAccountSettings.js

          "loadingUserSettings": "Ladataan käyttäjäasetuksia ...",
          "writePermission": "Kirjoituslupa",
          "writeJobs": "Kirjoita työpaikat",
          "writeGroups": "Kirjoita ryhmät",
          "writeRadiators": "Kirjoita radiaattorit",
          "readPermission": "Lukuoikeus",
          "readJobs": "Lue työt",
          "readGroups": "Lue ryhmät",
          "readRadiators": "Lue radiaattorit",
          "otherPermissions": "Muut käyttöoikeudet",
          "modifyUsers": "Muokkaa käyttäjiä",


          //AdminAccountsList.js
          "deleteUser": "Poista käyttäjä",

          //AdminGroupsCreator.js
          "groupCreation": "Ryhmän {{group_title}} luominen onnistui",
          "groupCreationFail": "Ryhmän luominen epäonnistui",
          "groupCreationTitle": "Ryhmän luomissivu",
          "groupNameLabel": "Ryhmän nimi:",

          //AdminGroupsList.js
          "groupName": "Ryhmän nimi",
          "editGroup": "Muokkaa ryhmää",
          "groupSettings": "Ryhmä asetukset",
          "newGroup": "Uusi ryhmä",

          //AdminHome.js
          "radiatorName": "Radiaattorin nimi",
          "editRadiator": "Muokkaa radiaattoria",
          "radiatorSettings": "Radiaattorin asetukset",
          "newRadiator": "Uusi radiaattori",
          "noOwner": "ei omistajaa",

          //AdminJobCreator.js
          "jobError": "Tarkista työn tiedot.",
          "jobCreated": "Työ {{job_name}} luotu onnistuneesti",
          "jobCreationError": "Työn luominen epäonnistui",
          "jenkinsError": "Tarkista jenkinsin tiedot.",
          "jenkinsAdded": "Jenkins {{jenkins_name}} on luotu onnistuneesti",
          "jenkinsAddFail": "Jenkinsin lisääminen epäonnistui",
          "createJob": "Luo työpaikka",
          "jobName": "Työn nimi",
          "jobPath": "Työpolku (jenkinsissä):",
          "searchJenkins": "Hae jenkins:",
          "hostname": "Hostname",
          "addJenkins": "Lisää jenkins",
          "jenkinsName": "Jenkins nimi",
          "jenkinsHostname": "Jenkins-isäntänimi",
          "jenkinsPort": "Jenkinsin satama",
          "jenkinsToken": "Jenkins-sovellusliittymän tunnus (käyttäjätunnus: token) \n Jätä tyhjäksi, jos julkiset jenkins",

          //AdminJobsList.js
          "newJob": "Uusi työpaikka",

          //AdminRadiatorCreator.js
          "radiatorCreated": "Radiaattorin {{radiator_name}} luominen onnistui",
          "radiatorCreationFailed": "Radiaattorin luominen epäonnistui",
          "radiatorCreationPage": "Radiaattorin luomissivu",

          //AdminRouter.js
          "credentialsCheck": "Tarkistetaan kirjautumistietoja ...",
          "oldLogin": "Kirjaudu nykyisenä käyttäjänä",
          "newLogin": "Rekisteröi uusi käyttäjä",

          //MainPage.js
          "welcome": "tervetuloa",
          "viewRadiator": "Näytä radiaattori",
          "adminPanel": "Hallintapaneeli",

          //RadiatorView.js
          "loadingRadiator": "Ladataan radiaattoreita ..."
        }
      }
    },
    lng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;