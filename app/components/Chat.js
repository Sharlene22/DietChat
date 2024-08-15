'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

import { useChat } from 'ai/react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Container
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    customUser: {
      main: '#99ba9a',         // Custom color for user messages
      contrastText: '#ffffff'
       // Custom text color
    },
    customAI: {
      main: '#a7b7db',         // Custom color for AI messages
      contrastText: '#000000', // Custom text color
    },
  },
});

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [open, setOpen] = useState(true); // Start with chat open
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
    
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundImage: 'url("/images/chatbg.jpg")', // Path to your background image
        backgroundSize: 'cover', // Make the background cover the entire div
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat',
      }}
    >
       {/* Sign Out Button */}
       <Button
        variant="contained"
        color="secondary"
        onClick={handleSignOut}
        style={{ position: 'absolute', top: 16, right: 16 }}
      >
        Sign Out
      </Button>
      {open && (
        <Paper
          elevation={4}
          style={{
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Chatbot
              </Typography>
              
            </Toolbar>
          </AppBar>
          <Box
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              backgroundColor: '#d5e6e8',
            }}
          >
            {messages.map((m, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'}
                mb={2}
              >
              <ThemeProvider theme={theme}>
                <Box
                  bgcolor={m.role === 'user' ? 'customUser.main' : 'customAI.main'}
                  color={m.role === 'user' ? 'primary.contrastText' : 'text.primary'}
                  p={2}
                  borderRadius={8}
                  maxWidth="80%"
                >
                  <Typography variant="body1">
                    {m.role === 'user' ? 'User: ' : 'AI: '}
                    {m.content}
                  </Typography>
                </Box>
                </ThemeProvider>
              </Box>
              
            ))}
          </Box>
          <form onSubmit={handleSubmit} style={{ display: 'flex', padding: 16 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              style={{ marginRight: 8 }}
            />
            <Button
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
              type="submit"
            >
              Send
            </Button>
          </form>
        </Paper>
      )}
    </div>
  );
}