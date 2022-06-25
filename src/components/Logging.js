// import { login, logout, isAuthenticated, getProfile } from "../utils/auth"4
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Grid, TextField, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { validateFields } from '../utils/validator'
import { login, register } from '../redux/actions/auth'
import Wrapper from './misc/PageWrapper'


const useStyles = makeStyles((theme) => ({
    togglePage: {
        textAlign: "center",
        paddingTop: '20px',
        cursor: "pointer"
    }
}))

export const Logging = () => {

    const classes = useStyles();
    const history = useHistory();
    const [loginRegister, setLoginRegister] = useState(0); //0 means login page show and 1 means register page show

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (user) history.push('/')
    }, [user])

    const toggleLoginRegister = () => setLoginRegister(!loginRegister)
    return (
        <Wrapper>
            {loginRegister ? <Register toggle={toggleLoginRegister} /> : <Login toggle={toggleLoginRegister} />}
        </Wrapper>)
}


const Register = (props) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [validation, setValidation] = useState({
        name: false,
        email: false,
        password: false
    })

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInput = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }))
        validate({ [field]: value })
    }

    const handleRegister = () => {
        //since setState is async, we are setting a temp Validation
        let validation = validate(state)

        if (Object.values(validation).every(value => value === false)) {
            dispatch(register(state))
        }
    }

    const validate = (obj) => {
        const temp = { ...validation }
        if ('name' in obj) {
            temp.name = validateFields.validateText(obj.name, 3, 20)
        }

        if ('email' in obj) {
            temp.email = validateFields.validateEmail(obj.email)
        }


        if ('password' in obj) {
            temp.password = validateFields.validatePassword(obj.password)
        }

        setValidation({ ...temp })
        return temp
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={state.name}
                    onChange={(e) => handleInput('name', e.target.value)}
                    fullWidth
                    {...(validation.name && { error: true, helperText: validation.name })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={state.email}
                    onChange={(e) => handleInput('email', e.target.value)}
                    fullWidth
                    {...(validation.email && { error: true, helperText: validation.email })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    value={state.password}
                    onChange={(e) => handleInput('password', e.target.value)}
                    type="password"
                    fullWidth
                    {...(validation.password && { error: true, helperText: validation.password })}
                />
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" onClick={handleRegister}>Register</Button>
            </Grid>

            <Grid item xs={12}>
                <Box color="text.secondary" className={classes.togglePage} variant="contained" onClick={props.toggle}>Already an user? Go to login</Box>
            </Grid>
        </Grid>
    )
}


const Login = (props) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [validation, setValidation] = useState({
        email: false,
        password: false
    })

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleInput = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }))
        validate({ [field]: value })
    }

    const handleLogin = () => {
        //since setState is async, we are setting a temp Validation
        let validation = validate(state)

        if (Object.values(validation).every(value => value === false)) {
            dispatch(login(state))
        }
    }

    const validate = (obj) => {
        const temp = { ...validation }
        if ('email' in obj) {
            temp.email = validateFields.validateEmail(obj.email)
        }

        if ('password' in obj) {
            temp.password = validateFields.validatePassword(obj.password)
        }

        setValidation({ ...temp })
        return temp
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={state.email}
                    onChange={(e) => handleInput('email', e.target.value)}
                    fullWidth
                    {...(validation.email && { error: true, helperText: validation.email })}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    value={state.password}
                    onChange={(e) => handleInput('password', e.target.value)}
                    type="password"
                    fullWidth
                    {...(validation.password && { error: true, helperText: validation.password })}
                />
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" onClick={handleLogin}>Login</Button>
            </Grid>

            <Grid item xs={12}>
                <Box color="text.secondary" className={classes.togglePage} variant="contained" onClick={props.toggle}>New here? Get an account</Box>
            </Grid>
        </Grid>
    )
} 