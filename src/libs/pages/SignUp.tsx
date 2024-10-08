"use client";
import React, { useState } from "react";
import {
    ChakraProvider,
    Box,
    Heading,
    Input,
    FormControl,
    FormLabel,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Image from "next/image";
import Link from "next/link";
import { Typography, TextField, Button } from "@mui/material";
import { firestore } from "../firebase/config"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [createUserWithEmailAndPassword, loading] =
        useCreateUserWithEmailAndPassword(auth);

    const router = useRouter();

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        event.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(email, password);

            const userId = res?.user?.uid;

            if (submitter.name === 'Influencer') {
                if (userId) {
                    await setDoc(doc(firestore, "users", userId), {
                        email: email,
                        password: password, 
                        createdAt: new Date(),
                    });
                }

                setEmail("");
                setPassword("");

                router.push("/influencersurvey");

            } else if(submitter.name === 'Buisness'){
                if (userId) {
                    await setDoc(doc(firestore, "users", userId), {
                        email: email,
                        password: password, 
                        createdAt: new Date(),
                    });
                }
                setEmail("");
                setPassword("");

                router.push("/buisnesssurvey");
            }

        } catch (e) {
            console.error("Error signing up:", e);
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
            flexDir="column">
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
                    background: "linear-gradient(90deg, #F1755F, #F15F9A)",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                }}
                paddingBottom={80}>
                BrandSync
            </Box>

            <form onSubmit={handleSignUp}>
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
                        input: { color: "white" },
                        label: { color: "white" },
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
                        input: { color: "white" },
                        label: { color: "white" },
                    }}
                />
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDir={"column"}>
                    <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDir={"row"}
                    gap ={30}>
                        <Button
                            type="submit"
                            name="Influencer"
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 3,
                                mb: 2,
                                background:
                                    "linear-gradient(90deg, #F1755F, #F15F9A)",
                                width: "200px",
                            }}>
                            {loading ? "Signing Up..." : "Influencer Sign Up"}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            name= "Buisness"
                            color="primary"
                            sx={{
                                mt: 3,
                                mb: 2,
                                background:
                                    "linear-gradient(90deg, #F1755F, #F15F9A)",
                                width: "200px",
                            }}>
                            {loading ? "Signing Up..." : "Buisness Sign Up"}
                        </Button>
                    </Box>
                    <Link href="/loginpage">
                        <Typography
                            sx={{
                                textDecoration: "underline",
                                color: "inherit",
                                "&:hover": {
                                    color: "blue",
                                },
                            }}>
                            {"Already have an account? Log In."}
                        </Typography>
                    </Link>
                </Box>
            </form>
        </Box>
    );
};

export default SignUp;
