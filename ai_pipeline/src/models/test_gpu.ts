import { Ollama } from "ollama";

async function main() {
    const ollama = new Ollama({
        host: "http://localhost:11434",
    });

    try {
        console.log("🚀 Connecting to Ollama...");
        
        const response = await ollama.generate({
            // model: "Mistral:latest",
            model: "Mistral:latest",
            prompt: "Why is the sky blue?",
            stream: false,
        });

        console.log("\n✅ Response from Mistral:");
        console.log("----------------------------");
        console.log(response.response);
        console.log("----------------------------");
        console.log(`\n⏱️  Total duration: ${(response.total_duration / 1e9).toFixed(2)}s`);
        console.log(`💭 Load time: ${(response.load_duration / 1e9).toFixed(2)}s`);
        console.log(`🔄 Eval time: ${(response.eval_duration / 1e9).toFixed(2)}s`);

    } catch (error) {
        console.error("❌ Error:", error);
        console.log("\n📋 Troubleshooting:");
        console.log("1. Make sure Ollama is running: ollama serve");
        console.log("2. Verify the model is installed: ollama list");
        console.log("3. Check if Ollama is accessible: curl http://localhost:11434/api/tags");
    }
}

main();