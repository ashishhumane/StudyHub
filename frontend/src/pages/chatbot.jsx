import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/header';
import { Bot, Mic, Send } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
const baseURl = process.env.VITE_BACKEND_URL

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setIsLoading(true);
    
    // Add loading message
    const loadingId = Date.now();
    setMessages((prev) => [...prev, { 
      sender: 'bot', 
      text: 'Thinking...', 
      isLoading: true, 
      id: loadingId 
    }]);
    
    try {
      const res = await axios.post(`${baseURl}/notes/chatbot`, { input }, { withCredentials: true });
      const generatedText = res.data?.response?.parts?.[0]?.text || '';
      
      console.log("Generated Text:", generatedText);
      
      // Remove loading message and add actual response
      setMessages((prev) => prev.filter(msg => msg.id !== loadingId));
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: generatedText,
          isMarkdown: true
        }]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      // Remove loading message and add error message
      setMessages((prev) => prev.filter(msg => msg.id !== loadingId));
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: 'Sorry, I encountered an error. Please try again.',
          isMarkdown: false
        }]);
        setIsLoading(false);
      }, 500);
    }
    
    setInput('');
  };

  const handleClick = () => {
    alert('Working on this Feature');
  };

  return (
    <>
      <Header />
      <div className="pt-[60px] pb-[70px] h-screen bg-blue-50 relative overflow-hidden">
        {/* Top Chat Header */}
        <div className="flex justify-center items-center h-[60px] bg-white shadow-md">
          <div className="flex gap-4 items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bot />
            </div>
            <h2 className="text-2xl font-mono font-bold">StudyBot</h2>
          </div>
        </div>

        {/* Messages Container */}
        <div className="px-4 py-2 overflow-y-auto h-[calc(100vh-130px)]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-lg max-w-[70%] ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white self-end ml-auto'
                  : 'bg-gray-200 text-black self-start mr-auto'
              }`}
            >
              {msg.sender === 'bot' && msg.isMarkdown ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown 
                    components={{
                      // Customize markdown rendering for better chat display
                      h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                      h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({children}) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                      code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>,
                      pre: ({children}) => <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mb-2">{children}</pre>,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : msg.sender === 'bot' && msg.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-500">{msg.text}</span>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Bottom Input */}
        <div className="flex justify-center items-center gap-3 fixed bottom-0 h-[70px] border-t w-full bg-white px-4">
          <div onClick={handleClick} className="border p-3 rounded bg-gray-50">
            <Mic size={22} color="#616161" />
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full max-w-4xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text"
              className="border p-3 w-full rounded focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 p-3 rounded-md disabled:opacity-50" disabled={isLoading}>
              <Send color="#fff" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;