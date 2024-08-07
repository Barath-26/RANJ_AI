import './DashboardPage.css';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import NewPrompt from '../../components/newprompt/NewPrompt';

const socket = io('https://ranjaibackend.vercel.app/');

const DashboardPage = () => {
    const { userId } = useAuth();

    useEffect(() => {
        socket.on('connect', () => console.log('Connected to WebSocket server'));

        socket.on('chatSaved', (data) => {
            const { chatId, chatLink } = data;
            console.log('Chat saved successfully:', chatId, chatLink);
            alert(`Chat created! View it here: ${chatLink}`);
        });

        socket.on('error', (message) => alert(`Error: ${message}`));

        return () => {
            socket.off('chatSaved');
            socket.off('error');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.text.value.trim();

        if (!text) return;

        console.log('Submitting chat:', { userId, text });

        socket.emit('newChat', { userId, text });
    };

    return (
        <div className='dashboardpage'>
            <div className='texts'>
                <div className='options'>
                    <div className='option'>
                        <img src='/chat.png' alt='Chat Icon'/>
                        <span>Welcome To Ranj AI!</span>
                    </div>
                </div>
            </div>
            <div className='formcontainer'>
            <NewPrompt />
            </div>
        </div>
    );
};

export default DashboardPage;
