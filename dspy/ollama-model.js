export class OllamaModel {
    async generate(prompt) {
        console.log('running ollama model with prompt', prompt);
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ model: 'llama3:8b', prompt})
        });

        const text = await response.text();
        const data = text
            .trim()
            .split('\n')
            .map(line => 
                JSON.parse(line)
                    .response
            )
            .join('');
        
        console.log('got data', data);
        return data;
    }
}

