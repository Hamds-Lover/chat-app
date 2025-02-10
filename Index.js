import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ChatApp() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const login = () => {
    if (username.trim()) {
      setUser(username);
    }
  };

  const sendMessage = () => {
    if (input.trim() || file) {
      const newMessage = {
        id: uuidv4(),
        user,
        text: input,
        media: file ? URL.createObjectURL(file) : null,
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setFile(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {!user ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <button
            onClick={login}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Welcome, {user}!</h2>
          <div className="mt-4 border p-4 h-60 overflow-y-auto bg-gray-100 rounded">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <strong>{msg.user}:</strong> {msg.text}
                {msg.media && <img src={msg.media} alt="media" className="mt-2 max-w-full rounded" />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="p-2 border rounded w-full mb-2"
              placeholder="Type a message..."
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-2"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
