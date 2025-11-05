# AI Pipeline 

This folder contains the files related to the development and implementation of the AI assistant and data process ELT.

Before working on this section, ensure that you are installed Anaconda Python and run the following command. 
    
    # conda activate ai-planning-D-App

    This command will initialize the Anaconda Python environment. Next whithin the environment import the required libraries for this project by running the code above.

    # pip install -r requirements.yml

    Now, you are go to process to use any feature on this application.
## Datasets

This folder contains the dataset for basic LLM feed-forawrd data.


## API

This folder contains the endpoint for the access of the model. Using curl or postman to test the api
http://localhost:8000/generate?prompt="add your prompt here"

    # uvicorn main:app --reload

    The command uvicorn run the file using the library and initiate a server.


## Notebooks

This folder contains the jupterNotebookd that allows the process of ELT and data preparation for feed the model.

## Data Processing

This folder contains the script to sinchnronize the datasets for the model LLM.

## Models

This folder contains the script to run and configurate the LLM seletect (Ollama).


