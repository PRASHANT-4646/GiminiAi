const text = document.getElementById('text');
const card = document.getElementById('card');

async function generateInfoo() {
    console.log(text.value);

    const data = {
        contents: [{
            parts: [{ text: text.value }]
        }]
    };

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAujLw2Rdjmz-Hd7U0SM20wNr7fHC6Wp-o', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    let finalResponse = result.candidates[0].content.parts[0].text;

    // 🧹 Clean unwanted symbols like *, - at the beginning of lines
    finalResponse = finalResponse
        .split('\n')
        .map(line => line.replace(/^[-*]\s*/, ''))  // remove leading * or - with optional space
        .join('\n');

    card.innerText = finalResponse;
}
