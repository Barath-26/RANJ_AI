import './ChatPage.css';
import NewPrompt from '../../components/newprompt/NewPrompt';


const ChatPage = () => {
    return (
        <div className='chatpage'>
            <div className='wrapper'>
                <div className='chat'>
                    <NewPrompt />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
