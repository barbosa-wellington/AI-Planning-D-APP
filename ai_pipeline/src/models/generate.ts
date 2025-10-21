import { Ollama} from "ollama";


//  Create a function using a local ollama with model Mistral
// This model Gemma3 requires a machine with minimum of 8GB RAM.
// to run the typescript type npx tsx generate.ts

async function main() {
    const ollama = new Ollama();

    //Regular response
    const response = await ollama.generate({
        model : "Gemma3:4b",
        // Prompt determine which response the model will provide.
        prompt:"Can you say hi to me?"
    });
    console.log(response.response);
}

main().catch(console.error);


// checking more option using typescripts endpoint