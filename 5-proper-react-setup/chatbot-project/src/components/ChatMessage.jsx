import RobotProfileImage from '../assets/robot.png'
import USerProfileImage from '../assets/user.png'
import './ChatMessage.css'

export function ChatMessage(props) {
                const sender = props.sender;

                return (
                    <div className = {sender === "user" ? "user-message" : "robot-message"}>
                        {sender === "robot" &&
                            (<img src= {RobotProfileImage} alt="Icon" width="30" height="30" className="message-icon"/>)}

                        <div className="message-content">
                            {props.message}
                        </div>

                        {sender === "user" &&
                            (<img src={USerProfileImage} alt="Icon" width="30" height="30" className="message-icon"/>)}
                    </div>
                );
            }