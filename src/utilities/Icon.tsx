import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chatbot from './Chatbot'; // Import your Chatbot component

export default function ImageAvatars() {
  const [isChatbotOpen, setIsChatbotOpen] = React.useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };

  return (
    <>
      <Stack direction="row" spacing={2} style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: '1000' }}>
        <div onClick={toggleChatbot}>
          <Avatar alt="Remy Sharp" src="/public/imgs/Biketopialogo.png" sx={{ width: 80, height: 80 }} />
        </div>
      </Stack>
      {isChatbotOpen && (
        <div className="chatbot-container" style={{ position: 'fixed', bottom: '100px', right: '20px', zIndex: '1000' }}>
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}
    </>
  );
}
