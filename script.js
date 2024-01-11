let textArea=document.querySelector('.msg')
let voiceList=document.querySelector('.voiceSelection')
let speechBtn=document.querySelector('.submit')
let isSpeaking=true;
let synth=speechSynthesis;
 
const voices=()=>{
    for(let voice of synth.getVoices()){
        // console.log(voice)
        //to iterate through dropdown
        let selected=voice.name==="Google US English"?"selected":"";
        //creating option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend",option)//inserting option tag beforeend of select tag
    }
 }
 synth.addEventListener("voiceschanged",voices);
 const textToSpeech=(text)=>{
    let utterance= new SpeechSynthesisUtterance(text);//it represents speech request
    for(let voice of synth.getVoices()){
        //if the available device voice name is equal to user selected voice name
        //then set the speech voice to user selected one
        if(voice.name===voiceList.value){
            utterance.voice=voice;
        
        }
    }
    synth.speak(utterance);//speak the speech

 }
 speechBtn.addEventListener("click",e=>{
    e.preventDefault();
    if(textArea.value!=""){
        if(!synth.speaking){//if speech is not currently in the process of speaking
            textToSpeech(textArea.value)//to avoid multiple listening on multiple btn pressings
        }if(textArea.value.length>80){
            //if isspeaking is true then change it's value to false and resume the speech
            //else change it's value to false and pause the speech
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking=false
                speechBtn.innerHTML ='<button>Pause the Speech</button>'
            }else{
                synth.pause()
                isSpeaking=true
                speechBtn.innerHTML='<button>Resume speech</button>'
            }
            // if (intervalId) {
            //     clearInterval(intervalId);
            // }
            // setInterval(()=>{
            //     if(!synth.speaking && !isSpeaking){
            //         isSpeaking=true;
            //         speechBtn.innerHTML='<button>Covert to Speech</button>'
            //     }
            // })
        }else{
            speechBtn.innerHTML='<button>Covert to Speech</button>'

        }

        }
        
    
 })