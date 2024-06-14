# Second Chance - Backend Final v4.1


## Tasks Accomplished

- Deployed MongoDB using Kubernetes
- Deployed the back-end server using Kubernetes
- Deployed the front-end server using IBM Code Engine


## Previous Tasks Accomplished:

- Added linting to the repository using a GitHub workflow containing GitHub Actions
- Configured automatic linting to check for errors whenever a developer creates a pull request or merges a branch into the default main branch
- Ran the back-end server
- Configured the back-end URL for the front end to use, inside `.env`
- Tested the following functionalities:
  - Main page loads and lists all 16 items
  - User registration and login, including the ability to log out and log back in
  - Logged-in user can add items, see item details, and change profile name
- Created an endpoint to update user credentials in the database (`/update`) in `authRoutes.js`
- Handled authentication by including JWT token generation
- Handled errors and structured responses in the server environment during and after an update
- Created an endpoint to login a user (`/login`) in `authRoutes.js`
- Handled authentication by including JWT token generation
- Handled errors and structured responses in a server environment
- Created a new file `authRoutes.js` and added an endpoint `/register` to register a user.
- Handled authentication by including JWT token generation.
- Handled errors and structured responses in a server environment.
- Configured the `api/auth` route in the Express application (`app.js`) to use the routes defined in `authRoutes.js`.
- Tested the authentication endpoints using Curl and Postman API.
- Used the `natural` library to perform sentiment analysis on English sentences.
- Implemented an Express server with a `/sentiment` endpoint.
- Tested the sentiment analysis endpoint using Curl and Postman API.
- Developed a search endpoint in `searchRoutes.js` to filter items based on different criteria.
- Integrated the search routes into the Express application (`app.js`).
- Tested the search endpoint using Curl and Postman API.
- Established MongoDB connection in `db.js`.
- Created endpoint to retrieve all secondChance items: `GET /api/secondchance/items`.
- Developed endpoint to add a secondChance item: `POST /api/secondchance/items`.
- Implemented endpoint to fetch a specific secondChance item by ID: `GET /api/secondchance/items/:id`.
- Created endpoint to update a specific secondChance item: `PUT /api/secondchance/items/:id`.
- Implemented endpoint to delete a specific secondChance item: `DELETE /api/secondchance/items/:id`.
- Configured the secondChance route in the Express application (`app.js`).
- Tested all endpoints using Curl and Postman API.
- Cloned a GitHub repository template containing the necessary files and data.
- Initialized and configured MongoDB in the lab environment.
- Employed command-line skills to navigate and execute database operations.
- Applied best practices in managing secure database connections using environment variables.
- Imported data into MongoDB.
- Established a new GitHub repository using a provided template.
- Formulated a template for user stories.
- Added user stories as GitHub issues.
- Organized user stories in preparation for enhancing the backlog.