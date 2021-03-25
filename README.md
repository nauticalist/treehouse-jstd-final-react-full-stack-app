# Treehouse FSJS Techdegree - Full Stack App with React and a REST API

This is React client for school database REST API

Folders: 
 - client: includes react client
 - api: includes school database REST API using Express.


##  INSTALLATION
01. Clone the repository: `git clone https://github.com/nauticalist/treehouse-jstd-final-react-full-stack-app.git`
    
### API INSTALLATION
01. First cd into api directory with `cd treehouse-jstd-final-react-full-stack-app/api/` and install the required dependencies with `npm install`
02. Run the `npm run seed` command to create database and populate the tables.
03. Launch the app with `npm start`.
04. Optional: Import `FSJS Techdegree- REST API Project.postman_collection.json` file to postman. You can test api endpoints with postman.

### CLIENT INSTALLATION
01. CD into client directory (assuming you are in api directory) `cd ../client`
02. Install dependencies with `npm install`
03. Run the project with `npm start`

**Test user**:
- Email: joe@smith.com
- Password: joepassword

## KNOWN ISSUES
 - Chrome based browsers may show '[Deprecation] SharedArrayBuffer will require cross-origin isolation as of M91, around May 2021'

It's a known react bug and will be fixed with next REACT release
https://github.com/facebook/react/pull/20831

