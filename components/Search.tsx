import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { ListItemIcon, MenuItem, SvgIcon } from '@mui/material';
import IconPack from 'simple-icons'
import Menu from '@mui/material/Menu';

export default function CustomizedInputBase() {
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
            <Paper
                component="form"
                variant='outlined'
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleClick}>
                    <SvgIcon inheritViewBox sx={{ color: `#${IconPack.Get('duckduckgo').hex}` }}>
                        <path d={IconPack.Get('duckduckgo').path} />
                    </SvgIcon>
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search with DuckDuckGo or enter address"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
            <Menu
                id="demo-customized-menu"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    variant: "outlined",
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '28ch',
                    },
                  }}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <ListItemIcon>
                        <SvgIcon inheritViewBox sx={{ color: `#${IconPack.Get('duckduckgo').hex}` }}>
                            <path d={IconPack.Get('duckduckgo').path} />
                        </SvgIcon>
                    </ListItemIcon>
                    DuckDuckGo
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <ListItemIcon>
                        <SvgIcon inheritViewBox sx={{ color: `#${IconPack.Get('google').hex}` }}>
                            <path d={IconPack.Get('google').path} />
                        </SvgIcon>
                    </ListItemIcon>
                    Google
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <ListItemIcon>
                        <SvgIcon inheritViewBox sx={{ color: `#${IconPack.Get('youtube').hex}` }}>
                            <path d={IconPack.Get('youtube').path} />
                        </SvgIcon>
                    </ListItemIcon>
                    Youtube
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <ListItemIcon>
                        <SvgIcon inheritViewBox sx={{ color: `#${IconPack.Get('wikipedia').hex}` }}>
                            <path d={IconPack.Get('wikipedia').path} />
                        </SvgIcon>
                    </ListItemIcon>
                    Wikipedia
                </MenuItem>
            </Menu>
        </>
    );
}
