import { Ollama} from "ollama";


//  Create a function using a local ollama with model Mistral
// This model requires a machine with minimum of 16GB RAM.
// to run the typescript type npx tsx generate.ts

async function main() {
    const ollama = new Ollama();

    //Regular response
    const response = await ollama.generate({
        model : "Mistral",
        // Prompt determine which response the model will provide.
        prompt:"Why is the sky blue?"
    });
    console.log(response.response);
}

main().catch(console.error);