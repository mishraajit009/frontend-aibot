import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('My Transcript is here');
  const [interimTranscript, setInterimTranscript] = useState('');
  const {
    transcript: finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Speech recognition is not supported in your browser.');
    }
  }, [browserSupportsSpeechRecognition]);

  const handleListen = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true, interimResults: true });
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
      console.log("My FINAL Transcript ---------------->",finalTranscript);
      setTranscript(finalTranscript);
    }
  };

  return (
    <div>
      <button onMouseDown={handleListen} onMouseUp={handleListen}>
        {isListening ? 'Stop Recording' : 'Start Recording'}
      </button>
      <p>{interimTranscript || transcript}</p>
    </div>
  );
};

export default SpeechToText;