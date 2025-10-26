from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate



# Creating the template so that the model can responde follow the this pre-define structure.
template = """
Answer the question below.

Here is the conversation history: {context}

Question: {question}

Answer: 
"""

model = OllamaLLM(model="Gemma3:4b")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handle_conversation():
    context = ""
    print("Here is the AI Assistant, type 'exti' to quit.")
    while True:
        user_input = input("User: ")
        if user_input.lower() == "exit":
            break
        result = chain.invoke({"context": context, "question": user_input})
        print("AI Assistant: ", result)
        context += f"\n User: {user_input}\n AI: {result}"
        
# result = model.invoke(input="hello world")
# result = chain.invoke({"context": "", "question": "hey how are you?"})
# print(result)


if __name__ == "__main__":
    handle_conversation()
