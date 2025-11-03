# AI Pipeline 

This folder contains the files related to the development and implementation of the AI assistant and data process ELT.

Before working on this section, it is necessary to run the command 
    
    # conda activate ai-planning-D-App

    This command will initialize the Anaconda Python environment with the already install libraries from the requirements.yml file.


## Datasets

This folder contains the dataset for basic LLM feed-forawrd data.


## API

This folder contains the endpoit for the access of the model.

    # uvicorn main:app --reload

    The command uvicorn run the file using the library and initiate a server.


## Notebooks

This folder contains the jupterNotebookd that allows the process of ELT and data preparation for feed the model.

## Data Processing

This folder contains the script to sinchnronize the datasets for the model LLM.

## Models

This folder contains the script to run and configurate the LLM seletect (Ollama).


