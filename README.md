# Node-Passport Social Auth

## OVERVIEW

Node-Passport Auth is a project for authenticating all the social media providers from only one server which will be used by Gluu server for authenticating users to all social networks.


## GOALS

- To create Node-Passport server which will provide social network authentication APIs for Gluu server.
- To create Gluu server interception scripts for authentication of users which will consume Node-Passport server api.


## SPECIFICATIONS

Node-Passport server authenticates users for all the social networks like: google+, facebook, twitter etc. Node-Passport uses passport authentication middleware for social network authentication. All the node js api are secured with JWT(JSON Web Token) so that all the requests to node js server are authenticated and can be trusted by the application.

Gluu server has only one interception script for all the social network providers which will call node js server for authenticating users to respective social network provider. The users will be added to Gluu server if the user does not present in the LDAP server of Gluu and if user does not exists then user will be added to server.


