from vertexai.preview.generative_models import GenerativeModel
import vertexai

# Initialize Vertex AI
vertexai.init(project="gen-lang-client-0890087892", location="us-central1")  

# Load Gemini flash model
model = GenerativeModel("gemini-1.5-flash")

# Trigger → Response mapping
trigger_responses = {
    "anxious": "It sounds like you're feeling anxious. Would you like some breathing exercises?",
    "help": "I’m here to help! You can tell me more about what you’re facing.",
    "panic": "Take a deep breath. Everything is going to be okay. You're not alone.",
    "deadline": "Deadlines can be stressful. Let’s break the task into small parts.",
    "fire": "🔥 Urgent alert detected! Should I notify someone or log this incident?",
    "overwhelmed": "When everything feels too much, try focusing on one small task at a time."
}

# Extract trigger words using Gemini
def extract_trigger_words(message: str) -> list:
    prompt = f"""
You are a trigger word extractor.

Extract only the important trigger words or phrases from the following message.

Respond ONLY with a valid Python list of strings.

Message: "{message}"
Output:
"""
    response = model.generate_content(prompt)
    try:
        return eval(response.text.strip())
    except Exception as e:
        print("⚠️ Error parsing response:", response.text)
        return []

# Generate a chatbot response
def generate_response(triggers: list) -> str:
    matched_responses = [trigger_responses[t] for t in triggers if t in trigger_responses]
    if matched_responses:
        return "\n".join(matched_responses)
    else:
        return "Thanks for sharing. I'm here to listen if you need anything."

# Run chatbot loop
if __name__ == "__main__":
    print("💬 Chatbot with Trigger Analysis (type 'exit' to quit)\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Bot: Goodbye! Stay safe. 💚")
            break

        triggers = extract_trigger_words(user_input)
        print(f"🧠 Detected Triggers: {triggers}")

        response = generate_response(triggers)
        print(f"Bot: {response}\n")