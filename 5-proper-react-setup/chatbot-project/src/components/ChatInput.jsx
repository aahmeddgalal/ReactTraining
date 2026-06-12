import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css'; //vite feature

export function ChatBot({chatMessages, setChatMessages}) { 
            const [inputValue, setInputValue] = useState(''); 
            function saveInputText(event) {
                setInputValue(event.target.value);
            }

            function sendMessage() {
                const newChatMessages = [
                    ...chatMessages, // spread operator to include existing messages
                    {
                        message: inputValue,
                        sender: "user",
                        id: "id" + crypto.randomUUID()
                    }
                ];

                setChatMessages(newChatMessages);

                const response = Chatbot.getResponse(inputValue);

                setChatMessages([
                    ...newChatMessages, // spread operator to include existing messages
                    {
                        message: response,
                        sender: "robot",
                        id: "id" + crypto.randomUUID()
                    }
                ]);


                setInputValue(''); // Clear the input field after sending the message
            }

                return (
                    <div className="chat-container">
                        <input
                            type="text"
                            placeholder="Type your message here..." 
                            onChange = {saveInputText} 
                            value={inputValue}
                            />

                        <button
                            onClick = {sendMessage}
                            className="send-button"
                            >Send</button>
                    </div>
                );
            } 