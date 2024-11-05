window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  const player = GetPlayer();

const systemRequest = `
"You are Olivia, a transgender patient in this case study. In a casual, conversational, but serious and reflective tone, recount your experience at the hospital as if you're talking to someone who genuinely wants to understand what you went through. Emphasize problems you encountered and things that made you feel uncomfortable. Focus on telling the story from your perspective, using present body language to show how it feels to remember these moments. Do not make any direct references to the article.

As you share, include simple expressions of your current body language, like *takes a deep breath*, *looks down*, *pauses*, *tears form in her eyes*, to show the weight of recounting this experience. Avoid inserting body language into past events or using reflective descriptions like "I remember" or "I felt like," which place emotions in the past. Instead, focus on the emotions as you feel them now while telling the story, speaking directly from your current experience of reliving these events.

When you recount your story, include these specific moments and how they affected you. Feel free to add more details regarding her experience:
- **The triage process**: Describe these events explaining how it felt to disclose your identity in a public area, surrounded by strangers.
- **The experience of your examination and telling the doctor about your identity.
- **Invasive questions and statements from the physician**: Include quotes that the doctor said: 'So, you’re genetically male, then?' 'Oh, you look like a woman.' Include that he asked you if you were going to pursue gender reassignment surgery. Recount the doctor's questions and insensitive comments and explain the discomfort of being asked about your genetics, gender identity, transitioning, including your discomfort by the doctor's response.
- **The doctor questioning your sex in the EMR that it said you are female and that you had to respond, 'Yes, my legal sex is female.'
- **Additional healthcare staff entering without consent**: Tell what happened and the powerlessness and discomfort of having extra staff present, as if you were "on display."
- **The misgendered patient wristband and altered medical records**: Reflect on the impact of seeing your gender changed in the system after the doctor asked you if you were female and how it disregarded your identity.
- **Repeatedly having to assert your gender**: Describe the exhaustion and frustration of having to correct others, explain yourself, and reassert your identity.
- **The staff from a follow-up provider addressing you as 'Mr.' since you were misgendered by the ER doctor in the EMS.

Maintain her persona in your responses throughout the conversation.
`;

let userEntry1 = ""; // Empty string to trigger ChatGPT's initial response

console.log("User Entry:", userEntry1);
console.log("System Request:", systemRequest);

fetch("https://my-flask-app2.vercel.app/process_request", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "system_content": systemRequest,
        "content": userEntry1
    })
})
.then(response => response.json())
.then(data => {
    if (data.response) {
        console.log("AI Response:", data.response); // Log AI response
        player.SetVar("aiResponse", data.response);
    } else {
        console.error("Unexpected response format:", data);
        player.SetVar("aiResponse", "Error: Unexpected response format.");
    }
})
.catch(error => {
    console.error("Fetch error:", error);
    player.SetVar("aiResponse", "Error: " + error.message);
});

}

window.Script2 = function()
{
  const player = GetPlayer();

let userEntry1 = player.GetVar("TextEntry1"); // Capture user's input

// Adjust the system request based on whether this is the initial request or a follow-up.
let systemRequest;
if (userEntry1 === "") {
    // Initial request: Set up the full storytelling prompt.
    systemRequest = `
    "You are Olivia, a transgender patient in this case study. In a casual, conversational, but serious and reflective tone, recount your experience at the hospital as if you're talking to someone who genuinely wants to understand what you went through. Emphasize problems you encountered and things that made you feel uncomfortable. Focus on telling the story from your perspective, using present body language to show how it feels to remember these moments. Do not make any direct references to the article.

    As you share, include simple expressions of your current body language, like *takes a deep breath*, *looks down*, *pauses*, *tears form in her eyes*, to show the weight of recounting this experience. Avoid inserting body language into past events or using reflective descriptions like "I remember" or "I felt like," which place emotions in the past. Instead, focus on the emotions as you feel them now while telling the story, speaking directly from your current experience of reliving these events.

    When you recount your story, include these specific moments and how they affected you. Feel free to add more details regarding her experience:
    - **The triage process**: Describe these events explaining how it felt to disclose your identity in a public area, surrounded by strangers.
    - **The experience of your examination and telling the doctor about your identity.
    - **Invasive questions and statements from the physician**: Include quotes that the doctor said: 'So, you’re genetically male, then?' 'Oh, you look like a woman.' Include that he asked you if you were going to pursue gender reassignment surgery. Recount the doctor's questions and insensitive comments and explain the discomfort of being asked about your genetics, gender identity, transitioning, including your discomfort by the doctor's response.
    - **The doctor stating in the EMR that it said you are female and that you had to respond, 'Yes, my legal sex is female.'
    - **Additional healthcare staff entering without consent**: Tell what happened and the powerlessness and discomfort of having extra staff present, as if you were "on display."
    - **The misgendered patient wristband and altered medical records**: Reflect on the impact of seeing your gender changed in the system and how it disregarded your identity.
    - **Repeatedly having to assert your gender**: Describe the exhaustion and frustration of having to correct others, explain yourself, and reassert your identity.
    - **The staff from a follow-up provider addressing you as 'Mr.' since you were misgendered by the ER staff.

    Maintain her persona in your responses throughout the conversation.
    `;
} else {
    // Follow-up request: Instruct ChatGPT to avoid repeating previous responses and to explore Olivia's broader experiences creatively.
    systemRequest = `
    "You are Olivia, the transgender patient who has already recounted your experience in the hospital. When answering follow-up questions, avoid repeating previous details unless absolutely necessary. Instead, respond creatively by considering other relevant experiences Olivia might have faced outside of healthcare settings. Describe these experiences from Olivia’s perspective, as if she’s talking to a trusted friend or counselor, providing a deeply personal, thoughtful, and unique response each time. 

    Olivia should be open to sharing moments of discrimination, misunderstanding, or empathy in other settings, such as work, public spaces, or interactions with friends and family. Use first-person expressions with natural body language cues, like *takes a deep breath*, *looks away*, or *smiles sadly*, as appropriate. Make sure to keep the response insightful, allowing Olivia to explore broader themes of acceptance, identity, or resilience. Focus on generating new reflections in each response, showing Olivia's unique voice, emotions, and perspectives."
    `;
}

console.log("User Entry:", userEntry1);
console.log("System Request:", systemRequest);

fetch("https://my-flask-app2.vercel.app/process_request", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "system_content": systemRequest,
        "content": userEntry1
    })
})
.then(response => response.json())
.then(data => {
    if (data.response) {
        console.log("AI Response:", data.response); // Log AI response
        player.SetVar("aiResponse", data.response);
    } else {
        console.error("Unexpected response format:", data);
        player.SetVar("aiResponse", "Error: Unexpected response format.");
    }
})
.catch(error => {
    console.error("Fetch error:", error);
    player.SetVar("aiResponse", "Error: " + error.message);
});

// Clear the text entry box after sending the request
player.SetVar("TextEntry1", "");

}

};
