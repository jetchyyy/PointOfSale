import React, { useState, useEffect } from "react";
import chatbotIcon from "../../public/imgs/Biketopialogo.png";
import { Button } from "@mui/material";
import "./Chatbot.css";

const Chatbot = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      text: "Hi there, welcome to Biketopia! How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const predefinedQuestions = [
    { question: "Who is handsome?", answer: "Sir Jimuel is handsome." },
    {
      question: "What are the modes of payments?",
      answer: "We accept Cash on delivery and Gcash payment.",
    },
    {
      question: "Where is your shop located?",
      answer:
        "You can view the location of our shop here: https://www.google.com/maps/dir//Purok+Caimitohan,+Brgy,+Lagtang+Grill+Across,+Talisay,+6045+Cebu/@10.2669676,123.7505266,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x33a99dc3e012d2e9:0x8c47a47e675b496d!2m2!1d123.8329285!2d10.266978?entry=ttu",
    },
    // Add more predefined questions and answers as needed
  ];

  const handlePredefinedQuestionClick = (question) => {
    const matchedQuestion = predefinedQuestions.find(
      (q) => q.question.toLowerCase() === question.toLowerCase()
    );
    if (matchedQuestion) {
      sendMessage(matchedQuestion.question);
      setIsBotTyping(true);
      setTimeout(() => {
        sendMessage(matchedQuestion.answer, false);
        setIsBotTyping(false);
      }, 5000); // Simulating a delay before bot responds
    }
  };

  const sendMessage = (text, isUser = true) => {
    setMessages([...messages, { text, isUser }]);
  };

  const handleSendMessage = () => {
    if (!inputText || inputText.trim() === "") return;
    sendMessage(inputText, true);
    setInputText("");
  };

  const toggleChatbot = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    onClose();
  };

  const renderMessage = (message, index) => {
    if (message.isUser) {
      return (
        <div
          key={index}
          className="message user"
          onClick={() => sendMessage(message.text)}
        >
          <span className="message-sender">You:</span> {message.text}
        </div>
      );
    } else {
      return (
        <div key={index} className="message bot">
          <span className="message-sender">ArzeytheChatbot:</span>{" "}
          {message.text.includes("https://") ? (
            <a
              href={message.text}
              target="_blank"
              rel="noopener noreferrer"
            >
              {message.text}
            </a>
          ) : (
            message.text
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    if (isBotTyping) {
      setTimeout(() => {
        sendMessage("is typing...", false);
      }, 1000);
    }
  }, [isBotTyping]);

  return (
    <div className={`chatbot-container ${isOpen ? "open" : "closed"}`}>
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <img
          src={chatbotIcon}
          alt="Chatbot Icon"
          className="chatbot-icon"
          style={{ width: 80, height: 80 }}
        />
      </div>
      {isOpen && (
        <div className="chatbot-content">
          <div
            style={{ cursor: "pointer", marginLeft: "250px", color: "blue" }}
            onClick={toggleChatbot}
          >
            Close
          </div>
          <div className="chatbot-questions">
            <h3></h3>
            {predefinedQuestions.map((item, index) => (
              <Button
                key={index}
                onClick={() => handlePredefinedQuestionClick(item.question)}
                className="question-button"
              >
                {item.question}
              </Button>
            ))}
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => renderMessage(message, index))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
            />
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
