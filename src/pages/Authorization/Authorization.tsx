import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { API_KEY } from './../../config';
import { AuthType } from '../../types';

const redColor = red[500]

const Authorization = () => {

    const dispatch = useDispatch()

    const [signCondition, setSignCondition] = useState('Authorization')

    const changeSignCondition = () => {
        let signConditionTemporary = signCondition === "Authorization" ? "Registration" : "Authorization";
        setSignCondition(signConditionTemporary)
    }

    const [requestMessage, setRequestMessage] = useState('')

    const auth = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        let target = (e.target as HTMLFormElement);
        const raw: AuthType = {
            email: target.email.value,
            password: target.password.value
        }

        const request = signCondition === "Authorization" ? "login" : "register"

        fetch(`${API_KEY}/${request}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raw)
        })
            .then(res => res.json())
            .then(res => {
                if (res.accessToken !== undefined) {
                    localStorage.setItem("jwt", res.accessToken);
                    dispatch({ type: "USER_AUTHORIZED_TRUE" })
                }
                else setRequestMessage(res)
            })
    }

    return (
        <form onSubmit={auth}>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <Box sx={{ position: 'relative', width: 600, height: 300, mx: 'auto', backgroundColor: '#FFFFFF', borderRadius: '30px' }}>
                    <Typography variant="h5" align='center' mt={2}>
                        {signCondition}
                    </Typography>
                    <Typography sx={{ position: 'absolute', left: "50%", transform: "translate(-50%)" }} color={redColor}>
                        {requestMessage}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            maxWidth: 400,
                            height: 120,
                            mx: 'auto',
                            mt: 5
                        }}>
                        <TextField id="email" placeholder='Email' />
                        <TextField id="password" type="password" placeholder='Password' />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button type="submit" variant="contained">
                            {signCondition === "Authorization" ? "Sign in" : "Sign up"}
                        </Button>
                        <Box sx={{ mx: 2 }}></Box>
                        <Button
                            onClick={() => changeSignCondition()}>
                            {signCondition === "Authorization" ? "Sign up" : "Sign in"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default Authorization;