import { ClickAwayListener, Grid, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { Outlet, useNavigate } from "react-router-dom";
import './auth.scss';
import React from "react";
import i18n from "../transaction/i18n";
import { I18nextProvider } from "react-i18next";

type Language = {
    key:string;
    name:string;
}
const options:Language[] = [{
        key:'en',
        name:'English'
    }, 
    {
        key:'vi',
        name:'VietNamese'
    }];

export default function AuthComponent() {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/login")
    },[])

    useEffect(() => {
        i18n.changeLanguage(options[selectedIndex].key);
        navigate("0");
        navigate("/login")
    },[selectedIndex]);

    const handleMenuItemClick = (index:any, key:string) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleClose = (event:any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className="auth-wrapper">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title="Chọn ngôn ngữ" placement="top-start" ref={anchorRef}>
                        <IconButton size="small" color="primary" aria-label="change other language" onClick={handleToggle}>
                            <LanguageIcon sx={{ mr: 2 }}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <div className="login-wrapper">
                <Outlet/>
            </div>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement="bottom-start"
            >
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                    transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu" autoFocusItem>
                                {options.map((option, index) => (
                                    <MenuItem
                                        key={option.key}
                                        disabled={index === 2}
                                        selected={index === selectedIndex}
                                        onClick={() => handleMenuItemClick(index, option.key)}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </div>
    )
}