import React from 'react'
import  "./Chat.scss"
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';

const Chat = () => {
  return (
    <div className='chat'>
        {/* chatHeader  */}
        <ChatHeader />



        {/* chatMessage  */}
        <div className='chatMessage'>
            <ChatMessage />
        </div>


        {/* chatInput  */}
        <div className='chatInput'>
            <AddCircleIcon />
            <form>
                <input type="text" placeholder='送信' />
                <button type='submit' className='chatInputButton'>
                    送信
                </button>
            </form>

            <div className='chatInputIcons'>
                <CardGiftcardIcon />
                <GifBoxIcon />
                <EmojiEmotionsIcon />
            </div>
        </div>
    </div>
  );
};

export default Chat