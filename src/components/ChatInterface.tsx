
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, X, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import SearchChat from "./SearchChat";

interface Message {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ConversationStarter {
  id: string;
  text: string;
}

interface ChatInterfaceProps {
  onClose?: () => void;
  workflowTitle?: string;
  conversationStarters?: ConversationStarter[];
}

const ChatInterface = ({ 
  onClose, 
  workflowTitle = "Chat Assistant",
  conversationStarters = [
    { id: "1", text: "Generate a marketing strategy for my business" },
    { id: "2", text: "Help me draft an email to a client" },
    { id: "3", text: "Summarize this article for me" },
    { id: "4", text: "Create a to-do list for my project" }
  ]
}: ChatInterfaceProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [input, setInput] = useState("");
  const [showStarters, setShowStarters] = useState(true);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/dashboard");
    }
  };
  
  const handleStarterClick = (text: string) => {
    setInput(text);
    setShowStarters(false);
    // In a real application, we would also send the message to the backend
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        content: "I'm processing your request. Here's what I can help you with...",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          
          <div className="text-xl font-medium panta-gradient-text">
            {workflowTitle}
          </div>
          
          <ProfileDropdown 
            name="Moin Arian" 
            email="moin@example.com"
          />
        </div>
      </header>
      
      {/* Chat Interface without Sidebar */}
      <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-50 relative">
        <div className="flex-1 flex flex-col relative">
          <ScrollArea className="flex-1 p-4 pt-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {showStarters && messages.length === 0 && (
                <div className="mb-8 flex flex-col items-center justify-center pt-12">
                  <h2 className="text-2xl font-semibold mb-6 text-center">{workflowTitle}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {conversationStarters.map((starter) => (
                      <Button
                        key={starter.id}
                        variant="outline"
                        className="text-left h-auto py-3 px-4 whitespace-normal hover:bg-black hover:text-white hover:border-black"
                        onClick={() => handleStarterClick(starter.text)}
                      >
                        {starter.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-panta-blue"
                          : "bg-gray-100"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <img 
                          src="/panta-logo.png" 
                          alt="PANTA Logo" 
                          className="h-5 w-5" 
                        />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-panta-blue text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div
                        className={`text-xs mt-2 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 bg-white">
            <SearchChat autoFocus={true} value={input} onChange={(e) => setInput(e.target.value)} />
            <div className="text-xs text-center mt-3 text-gray-500">
              PANTA Flows can make mistakes. Please check important information.
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-black hover:text-white"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close chat</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
