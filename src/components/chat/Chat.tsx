import React, { useEffect, useState } from 'react'
import  "./Chat.scss"
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifBoxIcon from '@mui/icons-material/GifBox';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hook';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface Messages {
    timestamp: Timestamp;
    message: string;
    user: {
        uid: string;
        photo: string;
        email: string;
        displayName: string;
    }
}

const Chat = () => {
    const [inputText, setInputText] = useState<string>("");
    const [messages, setMessages] = useState<Messages[]>([]);
    const channelName = useAppSelector((state)=> state.channel.channelName);
    const channelId = useAppSelector((state) => state.channel.channelId);
    const user = useAppSelector((state) => state.user.user);

    useEffect(() => {

        let collectionRef = collection(
            db,
            "channels",
            String(channelId),
            "messages",
            );

        onSnapshot(collectionRef, (snapshot) => {
            let results: Messages[] = [];
            snapshot.docs.forEach((doc) => {
                results.push({
                    timestamp: doc.data().timestamp,
                    message: doc.data().message,
                    user: doc.data().user,
                });
            });
            setMessages(results);
            console.log(results);
        });
    }, [channelId]);
    
    const sendMessage = async  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const collectionRef: CollectionReference<DocumentData> = collection(
          db,
          "channels",
           String(channelId),
          "messages"
          );

          const docRef: DocumentReference<DocumentData> =  await addDoc(
            collectionRef, {
                timestamp: serverTimestamp(),
                message: inputText,
                user: user,
          }
          );
          console.log(docRef);
          setInputText("");
    };


  return (
    <div className='chat'>
        {/* chatHeader  */}
        <ChatHeader channelName={channelName} />



        {/* chatMessage  */}
        <div className='chatMessage'>
            {messages.map((message, index) => (
                <ChatMessage 
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    user={message.user}
                    />
            ))}
        </div>

        <div className='chatInput'>
            <AddCircleIcon />
            <form>
            <input
            type="text"
            placeholder={`#${channelName}へメッセージを送信`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
            disabled={Boolean(!channelId)}
          />
                <button type='submit'
                        className='chatInputButton'
                        disabled={Boolean(!channelId)}
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
                        sendMessage(e)
                        }
                >
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