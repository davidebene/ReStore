import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../features/account/accountSlice';
import { clearBasket } from '../../features/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

export default function SignedInMenu() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button 
                color='inherit'
                onClick={handleClick}
                sx={{typography: 'h6'}}
            >
                {user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                    navigate("/");
                }}>
                        Logout
                </MenuItem>
            </Menu>
        </>
    );
}