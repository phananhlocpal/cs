import { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

export const ChatPage = () => {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .withAutomaticReconnect()
            .build();

        connect.start().then(() => console.log("Connected to SignalR"));

        connect.on("ReceiveMessage", (user, message) => {
            setMessages((prev) => [...prev, { user, message }]);
        });

        setConnection(connect);

        return () => {
            connect.stop();
        };
    }, []);

    const sendMessage = async () => {
        if (connection) {
            await connection.invoke("SendMessage", user, message);
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}: </strong>{msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="User"
                onChange={(e) => setUser(e.target.value)}
            />
            <input
                type="text"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
