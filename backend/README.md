# Backend

This folder contains files related to the application backend the script of SQL that uses migration and processing of drizzle configurations.


## API - Server.js

This file contains the endpoints for the access of the different table of the application. You can test the APIs either via curl prompt or via Postman.

    On the terminal navigate to the backend folder and run the command below. It will load the node library and a session will be initiated. By default you can access the application using the localhost and port 5001.

    # npm run dev

    After running the command open on your chosen browser using the following url to test the APIs available.

    http://localhost:5001/api/"add the API parameter here"

    Now, you are good to proceed and testing our API.

## Schema.js

This file contains the code implementation for the database using drizzle-kit to perform (generate - migrate)

   To  generate the drizzle schema run the command:

    # npx drizzle-kit generate

    To migrate the code using drizzle schema run the command:

    # npx drizzle-kit migrate