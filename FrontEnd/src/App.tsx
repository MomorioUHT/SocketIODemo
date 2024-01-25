import { useEffect, useState } from "react"
 
//IO
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:8000")


export const GlobalChat = () => {

    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [roomID, setRoomID] = useState('')

    const [receivedMessage, setReceivedMessage] = useState('')
    const [messageList, setMessageList]: any[] = useState([])

    
    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data])
        })
    }, [socket])

    const joinRoom = () => {
        if (roomID !== "") {
            socket.emit("join_room", roomID)
        }
    }

    const sendMessage = async() => {
        const messageData = {
            author: username,
            message: message,
            room: roomID,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message", messageData)
        setMessageList((list: any) => [...list, messageData])
    }
    
    return (
        <div>   
            <h1>Socket IO Demo 101</h1><br />
            <input onChange={(e) => setUsername(e.target.value)} placeholder="set Username"></input><br />

            <input onChange={(e) => setRoomID(e.target.value)} placeholder="Room ID"></input><br />
            <button onClick={joinRoom}>join Chat Room</button><br /><br />

            <input onChange={(e) => setMessage(e.target.value)} placeholder="Message"></input>
            <button onClick={sendMessage}>Send Message!</button>

            <span style={{
                fontSize:'30px',
                color: 'black'
            }}>
                {messageList.map((messageContent: any) => {
                    return (
                        <div>
                            <h6>{messageContent.author}: {messageContent.message} ({messageContent.time})</h6>
                        </div>
                    )
                })}
            </span>
        </div>
    )
}