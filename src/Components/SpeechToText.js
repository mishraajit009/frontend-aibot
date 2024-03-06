import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {ConnectionState }from './Socket/ConnectionState'
import {ConnectionManager} from './Socket/ConnectionManager'
import {Events} from './Socket/Events'
import {MyForm} from './Socket/MyForm'
import { socket } from '../socket';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('My Transcript is here');
  const [interimTranscript, setInterimTranscript] = useState('');
  const {
    transcript: finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log("FOO EVENT VALUE",value);
      setFooEvents(previous => [...previous, value]);
    }
    function onConnectError(error) {
      console.error("Socket connection error:", error);
      // Optionally add further actions here, like displaying an error message
    }
    socket.on('connect_error', onConnectError);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat message', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat message', onFooEvent);
      socket.off('connect_error', onConnectError);
    };
  }, []);




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

      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm />

    </div>
  );
};

export default SpeechToText;