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



## Ngrok for accessing Fitbit API

The Ngrok is an alternative option to allow anyone to access Dietly from anywhere. (AWS)

    To initialize the ngrok connection you need to ensure that you have the CORS and it is not blocking the access. Then you run the following command.

    # ngrok http 5001

## FITBIT access API

The fitbit is an external application that provides through user's authorization user's biometric and activity data. The API will only work once user's approval to access the data.

    To access the key string for check user's biometric data just paste this link on your chosen browser.
    
    # http://192.168.4.32:5001/fitbit/authorize