# Server setup

1. Setup the basic project by doing `npm init` to initialise the project, adding `.gitignore` file and license
2. Add a server.js file
3. Add the dependencies:
   - `npm i express`: for our express server
   - `npm i dotenv`: for handling environment variables
   - `npm i -D nodemon`: for live reloading during dev
4. Add the dev and start scripts. For start, can use `node server.js` where server.js is the entry point of our application and for dev, can use `nodemon server.js` instead.
5. In the server.js file, setup the basic express server by:
   - initialising the express app by calling the expess function, passing it a port and doing app.listen to listen to that port
   - can store the port in environment variables, and pass that port to express app
6. Can store the routes in routes/{route name}.js
