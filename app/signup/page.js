'use client';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';

const defaultTheme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/images/welcomebg.jpg")', // Path to your background image
      backgroundSize: 'cover', // Make the background cover the entire div
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    }}
    >
      <Container component="main" maxWidth="xs" sx={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid white', 
            borderRadius: '8px', 
            padding: '20px', 
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }} 
              InputProps={{ style: { color: 'white', borderColor: 'white' } }} 
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }} 
              InputProps={{ style: { color: 'white', borderColor: 'white' } }} 
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#AEC6CF', color: '#000000', borderColor: 'white', '&:hover': { bgcolor: '#ffff' } }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2" sx={{ color: 'white' }}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
  );
}
