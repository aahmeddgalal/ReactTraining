import { useState } from 'react'
import { ChatBot } from './components/ChatInput.jsx'
import ChatMessages  from './components/ChatMessages.jsx'

import './App.css'


function App() {
                const [chatMessages, setChatMessages] = useState([]);

                //const chatMessages = array[0]; // the first value of the userState array gives us the current value
                //const setChatMessages = array[1]; // the second value of the userState array gives us the function to update the state. in react we should use this function to update the state not updating the state directly because the react won't update the HTML
                //const [chatMessages, setChatMessages] = array; // we can use destructuring assignment to get the values of the userState array in a more convenient way





                return (
                    <div className="app-container">
                        
                        <ChatMessages 
                            chatMessages={chatMessages} 
                        />
                        <ChatBot
                            chatMessages={chatMessages}
                            setChatMessages={setChatMessages} 
                        />

                        {/* Chat messages are generated dynamically */}
                    </div>
                );
            }


export default App
