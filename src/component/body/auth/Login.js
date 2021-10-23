import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const  initialState = {
    username: '',
    password: '',
    err: '',
    success: '',
}



function Login()  {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {username, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('https://blocnot.herokuapp.com/user/login', {username, password})
            console.log(res)
            setUser({...user, err: '', success: res.data.msg})
    
            localStorage.setItem('firstLogin', true)
    
            dispatch(dispatchLogin())
            history.push("/")
    
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        
        <Container fluid="xl">
            
            <Form onSubmit={handleSubmit}>
                <Form.Text className="text-center fw-bold fs-1">
                    Авторизация
                </Form.Text>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ваш Логин</Form.Label>
                <Form.Control type="login" placeholder="login..." value={username} name="username" onChange={handleChangeInput} />            
                </Form.Group>      
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ваш пароль</Form.Label>
                <Form.Control autoComplete="off" type="password" placeholder="Password" value={password} name="password" onChange={handleChangeInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="submit">
                Войти
                </Button>
            </Form>
        </Container>
    );
};

export default Login;