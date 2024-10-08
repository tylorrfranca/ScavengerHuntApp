'use client';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { Box } from 'panda';
import Image from 'next/image';
import { TextField, Button, Typography } from '@mui/material';
import Link from 'next/link';


const LogIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const res = await signInWithEmailAndPassword(email, password);
          if (res) {
            setEmail('');
            setPassword('');
            router.push('/');
            console.log(user);
          }
        } catch (e) {
          console.error(e);
        }
    };

    return (
        <Box
          width="100%"
          height="100vh"
          bgColor="#2A263E"
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingBottom={200}
          flexDir="column"
        >
            <Image
              src="/logo2.png"
              alt="BrandSync"
              width={400}
              height={400}
            />
            <Box
              fontSize="xxx-large"
              fontWeight="bold"
              css={{
                background: 'linear-gradient(90deg, #F1755F, #F15F9A)',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              paddingBottom={80}
            >
              BrandSync
            </Box>
            
            <form onSubmit={handleSignIn}>
              <TextField
                variant="outlined"
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
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    input: { color: "white" }, // Change the input text color to white
                    label: { color: "white" }, // Change the label color to white
                  }}
                />
              <TextField
                variant="outlined"
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
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    input: { color: "white" }, // Change the input text color to white
                    label: { color: "white" }, // Change the label color to white
                  }}
                />
              <Box 
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDir={'column'}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 , background: 'linear-gradient(90deg, #F1755F, #F15F9A)', width:'200px'}}
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </Button>
                  <Link href="/signuppage">
                  <Typography
                    sx={{
                    textDecoration: 'underline', // Underline by default
                    color: 'inherit', // Keep the default color
                    '&:hover': {
                        color: 'blue', // Change color to blue on hover
                    },
                    }}
                >
                    {"Don't have an account? Sign Up"}
                </Typography>
                </Link>
              </Box>
            </form>
        </Box>
    );
};

export default LogIn;
