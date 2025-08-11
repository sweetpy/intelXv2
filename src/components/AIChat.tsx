import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff,
  Paperclip,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  AlertTriangle,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Minimize2,
  Maximize2,
  X
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: string[];
  insights?: any[];
  confidence?: number;
  sources?: string[];
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onMinimize, isMinimized }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Intelligence Assistant. I can analyze your data, provide market insights, suggest innovative strategies, and help you discover hidden opportunities. What would you like to explore today?',
      timestamp: new Date(),
      confidence: 95
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase();
    let response = '';
    let insights: any[] = [];
    let confidence = 85;

    if (input.includes('market') || input.includes('opportunity')) {
      response = `Based on my analysis of your data bank, I've identified several high-potential market opportunities:

🎯 **Mbeya Region Expansion**: 32% untapped market potential with FMCG products
📈 **Rural Digital Commerce**: 45% growth in mobile payment adoption creates new distribution channels  
🌱 **Agri-Tech Integration**: Cross-selling opportunities between agriculture and healthcare sectors

**Recommended Actions:**
1. Conduct immediate market entry study for Mbeya region
2. Develop mobile-first rural distribution strategy
3. Create integrated agri-health product bundles

Would you like me to generate a detailed market entry plan for any of these opportunities?`;
      
      insights = [
        { type: 'opportunity', title: 'Mbeya Market Entry', confidence: 89 },
        { type: 'trend', title: 'Rural Digital Growth', confidence: 87 }
      ];
      confidence = 91;
    } else if (input.includes('competitor') || input.includes('threat')) {
      response = `🚨 **Competitive Intelligence Alert**

I've detected significant competitive activity that requires immediate attention:

⚠️ **Major Threat**: Competitor planning 40% distribution expansion in Mwanza and Tabora regions
📊 **Market Share Risk**: Potential 15% market share loss if no counter-action taken
⏰ **Timeline**: Competitor launch expected within 6 months

**Strategic Counter-Measures:**
1. Accelerate market penetration in target regions
2. Strengthen distributor partnerships with exclusive agreements
3. Launch competitive pricing strategy
4. Enhance value proposition with additional services

Shall I develop a detailed competitive response strategy?`;
      
      insights = [
        { type: 'threat', title: 'Competitive Expansion', confidence: 85 },
        { type: 'recommendation', title: 'Counter-Strategy', confidence: 88 }
      ];
      confidence = 87;
    } else if (input.includes('innovation') || input.includes('creative') || input.includes('idea')) {
      response = `💡 **Creative Innovation Opportunities**

I've analyzed cross-industry patterns and generated these breakthrough ideas:

🚀 **AI-Powered Micro-Franchising**: Create intelligent micro-franchise networks where AI manages operations for local entrepreneurs
🌐 **Blockchain Supply Transparency**: Implement end-to-end traceability for consumer trust and supply optimization
🤖 **Predictive Social Commerce**: Use social media sentiment to predict demand and auto-adjust distribution

**Disruptive Concepts:**
• Satellite + IoT demand prediction based on weather and population movement
• Healthcare-logistics hybrid networks for rural communities
• Cross-industry data monetization platforms

Which innovation area interests you most? I can develop detailed implementation roadmaps.`;
      
      insights = [
        { type: 'recommendation', title: 'Micro-Franchising', confidence: 94 },
        { type: 'prediction', title: 'Blockchain Adoption', confidence: 82 }
      ];
      confidence = 93;
    } else if (input.includes('data') || input.includes('analysis')) {
      response = `📊 **Data Intelligence Summary**

Your intelligence data bank contains powerful insights:

**Key Patterns Discovered:**
• 84% correlation between weather patterns and FMCG demand
• Rural mobile payment adoption growing 45% annually
• Youth demographic (18-35) drives 60% of purchasing decisions

**AI Model Performance:**
• Demand forecasting: 94.2% accuracy
• Market expansion predictor: 87.5% accuracy
• Customer churn prediction: 91.8% accuracy

**Actionable Intelligence:**
1. Implement weather-based inventory planning
2. Develop youth-focused digital marketing campaigns
3. Expand mobile payment integration in rural areas

Would you like me to dive deeper into any specific data pattern or generate predictive models?`;
      
      insights = [
        { type: 'correlation', title: 'Weather-Demand Pattern', confidence: 84 },
        { type: 'trend', title: 'Mobile Payment Growth', confidence: 91 }
      ];
      confidence = 89;
    } else {
      response = `I understand you're looking for insights! I can help you with:

🧠 **Market Intelligence**: Analyze market opportunities, competitive threats, and consumer trends
📊 **Data Analysis**: Find patterns, correlations, and predictive insights in your data
💡 **Innovation Ideas**: Generate creative solutions and disruptive business concepts
🎯 **Strategic Planning**: Develop actionable strategies based on data-driven insights

Try asking me about:
• "What market opportunities do you see?"
• "Analyze competitor threats"
• "Generate innovative ideas for rural markets"
• "Show me data patterns and correlations"

What specific area would you like to explore?`;
      confidence = 80;
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      insights,
      confidence,
      sources: ['Intelligence Data Bank', 'AI Analysis Engine', 'Pattern Recognition System']
    };
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputMessage('What are the best market opportunities in Tanzania?');
        setIsListening(false);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Intelligence Assistant</h3>
              {!isMinimized && (
                <p className="text-xs text-purple-100">Powered by Advanced Analytics Engine</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMinimize}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center mb-2">
                      {message.type === 'ai' ? (
                        <Bot className="h-4 w-4 text-purple-600 mr-2" />
                      ) : (
                        <User className="h-4 w-4 text-white mr-2" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.confidence && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {message.confidence}% confidence
                        </span>
                      )}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    
                    {message.insights && message.insights.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.insights.map((insight, index) => (
                          <div key={index} className="bg-white/10 rounded p-2">
                            <div className="flex items-center text-xs">
                              <Lightbulb className="h-3 w-3 mr-1" />
                              {insight.title} ({insight.confidence}%)
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.type === 'ai' && (
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-green-600 transition-colors">
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          <button className="text-gray-500 hover:text-red-600 transition-colors">
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                          <button className="text-gray-500 hover:text-blue-600 transition-colors">
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <button className="text-gray-500 hover:text-purple-600 transition-colors">
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 text-purple-600 mr-2" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isListening ? "🎤 Listening..." : "Ask me about market insights, opportunities, or innovations..."}
                    className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isListening}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <button
                      onClick={handleVoiceInput}
                      className={`p-1 rounded transition-colors ${
                        isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-purple-600'
                      }`}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <Paperclip className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>💡 Try: "Find market opportunities"</span>
                  <span>🎯 "Analyze competitor threats"</span>
                </div>
                <div className="flex items-center">
                  <Brain className="h-3 w-3 mr-1 text-purple-500" />
                  <span>AI Active</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChat;