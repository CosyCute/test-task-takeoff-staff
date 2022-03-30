import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
const Header = () => {

    const dispatch = useDispatch()

    const logout = () =>{
        localStorage.removeItem("jwt");
        dispatch({type: "USER_AUTHORIZED_FALSE"})
    }

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography
                        variant="h5">
                        Takeoff Staff
                    </Typography>
                    <Button
                        onClick={() => logout()}
                        color="inherit"
                        variant="text">
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;