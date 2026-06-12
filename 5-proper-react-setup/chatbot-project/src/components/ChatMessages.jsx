import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css'

function ChatMessages({chatMessages}) {

                const chatMessagesRef = useRef(); 
                // the useRef hook is used to create a reference to a DOM element or a value that persists across renders. It returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.



                useEffect(() => {
                    const containerElem = chatMessagesRef.current;
                    if (containerElem) {
                        containerElem.scrollTop = containerElem.scrollHeight
                    }
                }, [chatMessages]); // the second parameter of the useEffect hook is an array of dependencies. The effect will only run when one of the dependencies changes. In this case, we want to run the effect every time the chatMessages state changes, so we pass chatMessages as a dependency.
                
                // the useEffect hook is used to perform side effects in function components. It takes a function as an argument and runs that function after every render. The second argument is an array of dependencies, if any of the dependencies change, the effect will run again. In this case, we want to run the effect every time the chatMessages state changes, so we pass chatMessages as a dependency.

                if (chatMessages.length === 0) {
                    return (
                        <div className="welcome-message">
                            Welcome to the chatbot project! Send a message using the textbox below.
                        </div>
                    );
                }


                return (
                    <div 
                    className="chat-messages-container"
                    ref = {chatMessagesRef}
                    >
                        {/* onClick is an event and sendMessage is the event handler */}

                        {chatMessages.map((chatMessage) => {
                            return (
                                <ChatMessage
                                    message={chatMessage.message}
                                    sender={chatMessage.sender}
                                    key={chatMessage.id}
                                />
                            );
                        })}
                    </div>
                );
            }

            export default ChatMessages; //default Export to export one thing from a file 