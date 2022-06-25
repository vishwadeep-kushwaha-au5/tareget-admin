import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import MiniDrawer from './MiniDrawer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        width: '100%',
    },
    content: {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        paddingTop: '64px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    }
}))

const Wrapper = (props) => {
    const classes = useStyles()
    
    const user = useSelector(state=>state.auth.user)

    return (
        <div className={classes.main}>
            {console.log(Boolean(user))}
            {user?
            <MiniDrawer>
                {detailsSectionShow=>
                    <div>
                        {props.children(detailsSectionShow)}
                    </div>
                }
            </MiniDrawer>:
            <>{props.children}</>}
        </div>
    )
}

export default Wrapper;