import React from 'react'
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

const ChatMessage = () => {
  return (
    <div className='message'>
        <Avatar />
        <div className='MessageInfo'>
            <h4>takuma code
                <span className='messageTimestamp'>2022/12/18</span>

                <p>メッセージ本文</p>
            </h4>
        </div>
    </div>
  )
}

export default ChatMessage