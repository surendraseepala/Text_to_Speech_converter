let textArea = document.querySelector('.msg');
let voiceList = document.querySelector('.voiceSelection');
let speechBtn = document.querySelector('.submit');
let isSpeaking = true;
let synth = speechSynthesis;

const voices = () => {
    voiceList.innerHTML = ""; // Clear previous options
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
};

synth.addEventListener("voiceschanged", voices);
voices(); // Call voices function after adding the event listener

const textToSpeech = (text) => {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
};

speechBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (textArea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textArea.value);
        }
        if (textArea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = 'Pause the Speech';
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = 'Resume Speech';
            }
        } else {
            speechBtn.innerText = 'Convert to Speech';
        }
    }
});
