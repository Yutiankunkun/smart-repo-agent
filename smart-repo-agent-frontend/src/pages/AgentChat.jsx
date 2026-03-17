import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api/chat';
import ToolExecutions from '../components/ToolExecutions';

export default function AgentChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await sendMessage(text);
      const data = res.data;

      const assistantMessage = {
        role: 'assistant',
        content: data.reply || '',
        tool_calls: data.tool_calls || [],
        tool_executions: data.tool_executions || [],
        error: data.error,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'エラーが発生しました');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: null,
          error: err.response?.data?.detail || err.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-white shadow-sm shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">AI 面談アシスタント</h2>
        <p className="text-slate-500 mt-1 text-sm">学生情報の照会や面談メモの要約などができます</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
        <div className="max-w-2xl lg:max-w-3xl mx-auto space-y-5">
          {messages.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg">メッセージを入力して会話を始めてください</p>
              <p className="mt-2 text-sm">例：「sid0001の学生情報を教えて」</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div>
                    {msg.error ? (
                      <p className="text-red-600">{msg.error}</p>
                    ) : (
                      <>
                        {msg.content && (
                          <p className="whitespace-pre-wrap text-slate-800">{msg.content}</p>
                        )}
                        {msg.tool_executions && msg.tool_executions.length > 0 && (
                          <ToolExecutions executions={msg.tool_executions} />
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] shrink-0">
        <form onSubmit={handleSubmit} className="max-w-2xl lg:max-w-3xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
