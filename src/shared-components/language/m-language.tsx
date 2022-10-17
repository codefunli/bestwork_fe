import { ClickAwayListener, Grid, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import React from 'react';
import i18n from '../../transaction/i18n';
import { useTranslation } from 'react-i18next';
import './m-language.scss';

type Language = {
    key: string;
    name: string;
    icon: string;
};
const options: Language[] = [
    {
        key: 'en',
        name: 'en',
        icon: '/language/en.png',
    },
    {
        key: 'vi',
        name: 'vi',
        icon: '/language/vi.png',
    },
];

interface Props {
    color?: 'info' | 'inherit' | 'default' | 'error' | 'primary' | 'secondary' | 'success' | 'warning';
}

export default function MLanguage(props: Props) {
    const { color } = props;
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(options[selectedIndex].key);
    }, [selectedIndex]);

    const handleMenuItemClick = (index: any, key: string) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className="multiple-language">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title={t('common.selectLanguage')} placement="bottom-start" ref={anchorRef}>
                        <IconButton
                            size="small"
                            color={color}
                            aria-label="change other language"
                            onClick={handleToggle}
                        >
                            <LanguageIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

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
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
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
                                            <img
                                                className="language-icon"
                                                src={option.icon}
                                                alt={option.name}
                                                title={option.name}
                                            />
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
    );
}
