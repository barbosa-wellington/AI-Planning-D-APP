# AI Pipeline 

This folder contains the files related to the development and implementation of the AI assistant and data process ELT.

Before working on this section, ensure that you are installed Anaconda Python and run the following command. 
    
    # conda activate ai-planning-D-App

    This command will initialize the Anaconda Python environment. Next whithin the environment import the required libraries for this project by running the code above.

    # pip install -r requirements.yml

    Now, you are good to go and use any feature on this application.
## Datasets

This folder contains the dataset for basic LLM feed-forawrd data.


## API

This folder contains the endpoints for the access of the model. You can test the APIs either via curl prompt or via Postman.

    On the terminal run the command above. It will load the unicorn library and an session will be initiate. By default you can access the application using the localhos and port 8000.

    
    # uvicorn main:app --reload

    After running the command open on your chosen browser using the following url followed by your prompt to test the API and model.

    http://localhost:8000/generate?prompt="add your prompt here"

    Now, you are good to proceed and testing our API.

## Notebooks

This folder contains the jupterNotebooks that allows the process of ELT and data preparation for feed the AI model.

    Before using the following command, ensure that you have installed Anaconda Python.

    # jupyter notebook

## Models

This folder contains the script to run and configurate the LLM seletect (Ollama).


