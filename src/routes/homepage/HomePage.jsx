import { Link } from 'react-router-dom';
import './HomePage.css';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

const HomePage = () => {
  const [typingstatus, settypingstatus] = useState("Human1");

  return (
    <div className='homepage'>
      <img src='orbital.png' alt='' className='orbital' />
      <div className='left'>
        <h1>RANJ AI</h1>
        <h2>Supercharge your Creativity and Productivity</h2>
        <h3>Redefining the future possibilities.</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className='right'>
        <div className='imgcontainer'>
          <div className='bgcontainer'>
            <div className='bg'></div>
          </div>
          <img src='/bot.png' alt='' className='bot' />
          <div className='chat'>
            <img src={typingstatus === "Human1" ? "/human1.jpg" : typingstatus === "Human2" ? "/human2.jpg" : "bot.png"} alt='' />
            <TypeAnimation
              sequence={[
                'Hey',
                1000, 
                () => {
                  settypingstatus("Human1");
                },
                'Hey',
                1000, 
                () => {
                  settypingstatus("Bot");
                },
                'What\'s up',
                1000, 
                () => {
                  settypingstatus("Human2");
                },
                'Nothing',
                1000, 
                () => {
                  settypingstatus("Bot");
                }
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className='terms'>
      <img src='/Logo.png' alt=''/>
      <Link to="/">Terms & Policy</Link>
      </div>
    </div>
  );
}

export default HomePage;
