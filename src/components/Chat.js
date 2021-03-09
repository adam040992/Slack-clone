import React from 'react'
import styled from 'styled-components';
import StarBorderOutlineIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlineIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput';
import Message from './Message';

import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

function Chat() {
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    );
    const [roomMessages] = useCollection(
        roomId && 
            db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy("timestamp", 'asc')
    );

    return (
        <ChatContainer>
            <>
            <Header>
                <HeaderLeft>
                    <h4><strong>#{roomDetails?.data().name}</strong></h4>
                    <StarBorderOutlineIcon />
                </HeaderLeft>

                <HeaderRight>
                    <p>
                        <InfoOutlineIcon /> Details
                    </p>
                </HeaderRight>
            </Header>

            <ChatMassages>
                {roomMessages?.docs.map(doc => {
                    const { message, timestamp, user, userImage } = doc.data();

                    return (
                        <Message 
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    )
                })}
            </ChatMassages>

            <ChatInput 
                channelName={roomDetails?.data().name}
                channelId={roomId}
            />

            </>
        </ChatContainer>
    )
}

export default Chat

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
    }

    > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMassages = styled.div`

`;


const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    margin-top: 60px;
    overflow-y: scroll;
`;