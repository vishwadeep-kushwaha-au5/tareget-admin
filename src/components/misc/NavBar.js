import { useState, useRef } from 'react';
import clsx from 'clsx';

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
}))


const NavBar = (props) => {
    const classes = useStyles();
    const anchorEl = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const handleProfileMenuToogle = () => setIsMenuOpen(prevState => !prevState);
    const handleLogout = () => {
        dispatch(logout())
        handleProfileMenuToogle()
    }
    const renderMenu = (
        <Menu
            anchorEl={anchorEl.current}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            getContentAnchorEl={null}
            open={isMenuOpen}
            onClose={handleProfileMenuToogle}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )


    return (
        <div>
            <AppBar 
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
                })}>
                <Toolbar className={classes.grow}>
                    <IconButton color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                        [classes.hide]: props.open,
                        })}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Target Delivery
                    </Typography>
                    <div className={classes.grow} />
                    {user && <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleProfileMenuToogle}
                        ref={anchorEl}
                        color="inherit"
                    >
                        <Avatar src={user.picture} />
                        <ArrowDropDownIcon style={{ fontSize: '32px' }} />
                    </IconButton>}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}

export default NavBar;