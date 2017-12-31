# Easy Event Community

### Cyber Security Base - Course Project 1

This is a project created as a part of Cyber Security Base course series. Technologies used:

1. Node
2. React 
3. MySQL

Requirements: 
1. Node.js runtime environment.

Setup:
1. Clone the project
2. cd insecure-system
3. npm install
4. To run as a production: $ node server
    - Application runs on localhost:3000
5. To run separately backend server and client development server, first run $ node server, and then $ npm run start-dev on other terminal
    - Dev server will prompt to use another port from default. y and enter.
    - Application runs on localhost:3001


This project demonstrates very simple event signup application. Many information security flaws can be found from the project and should be fixed before releasing to production. Lot of data can be accessed easily without proper authentication. Unfortunately, sometimes server crashes and has to be restarted.

Rather than using project template, I created the project “from scratch” (except create react app boilerplate) as the Node stack is much more familiar for me to work with. Server running on node is completely stateless, so there are no server-side sessions for users. All session-centric data (user token) is stored in client browser’s session storage. Server only works as a REST JSON-interface. Authentication is implemented by using Json Web Token (JWT) which is stored in browser’s window.

Even though project is constructed with modern technologies, it’s far from secure. React handles well cross site scripting issues, but acquisition of data is implemented poorly. Storing session information in browser’s memory also creates problems. Session information is easily accessible, and for example, the JWT token is easily acquired. If the key for encoding the token can be found, all user information is visible to attacker.


Here are some issues found in the program:

Issue: SQL injection
Steps to reproduce:
1.	Go to admin login
2.	As a username and a password write ‘or’’=’. You can also use usernames that are known, for example ‘admin’ for admin privileges, and ‘Jason’ for organizer.
3.	Submit form
4.	Access is granted to admin/organizer site

SQL injection is possible as the parameters are included in SQL queries without any parsing or validation. All input data should be properly validated and not inserted straight to queries. User can even write scripts to drop whole tables with an ease, so this is very serious issue.. Client-side validation should do basic validation and prompt user if the data is not acceptable. Server-side should parse the data to pure string that doesn’t contain any SQL related commands or markup.

Issue: Insecure Direct Object References
Steps to reproduce:
1.	Select event from the list
2.	Click “See more”
3.	In the browser URL field you can see the pattern of getting different events
4.	Change the number parameter, you will get another event displayed.

If the event would be closed and shouldn’t be available, it could be accessed with direct object reference. Instead of using running numbers for id:s, hashes would help with this issue.

Issue: Sensitive data exposure
Steps to reproduce:
1.	Log in as admin
2.	Open browser developer tools
3.	Go no network –tab
4.	Find users –request
5.	Preview data shows all users accounts including plain text passwords

Here are couple issues to fix. The request finds all information about users, including passwords that shouldn’t be passed to client. In addition, passwords are stored in the database without any kind of encryption. This is very bad practice and should be fixed. In the API, the user SQL query should only return needed values, and not passwords, even if they are not rendered in the client markup. In addition to this, all sensitive information, such as passwords, should be encrypted using strong enough algorithms, for example sha1. In case database will expose, the information is at least encrypted.

Issue: Missing Function Level Access Control
Steps to reproduce:
1.	Log in as organizer (username Jason, password hke56)
2.	Open browser developer tools
3.	Find Session storage
4.	Modify user object and change role from 3 to 5
5.	Refresh page
6.	Users are now visible, even though only admin level users should have access to them
7.	With postman it is also possible to create an event without any kind of authentication sending a post request to the server

Users route needs logged user to access the data, but required authentication level is not checked in server side. Only markup is hidden if the user has role set to lower than required, but the data is still there. Solution for this is to create access level check for the route providing users. User role should be confirmed comparing it to actual data in database. Thus rogue user wouldn’t have access to this information.

Issue: Broken Authentication and Session Management
Steps to reproduce:
1.	Use OWASP Zap or similar program
2.	Set breakpoint to login post
3.	Login with the application
4.	Zap catches the request and shows the payload
5.	Unencoded password and username can be seen

Plain-text username password combinations are send through unencrypted connection (HTTP) and are not even encrypted themselves. This way it’s very easy to do man in the middle –attack and acquire credentials to access functionalities that require authorization. In order to fix this, all data between client and server should be encrypted. Also, the connection should be secure (HTTPS) to make it harder to find usable data.
