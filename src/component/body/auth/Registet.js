import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isLength, isMatch} from '../../utils/validation/Validation'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const initialState = {
    name: '',
    username: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)
    const history = useHistory()
    const {name, username, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})        

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('https://blocnot.herokuapp.com/user/register', {
                name, username, password
            })

            setUser({...user, err: '', success: res.data.msg})
            setTimeout(() =>{
                history.push("/admin")
            }, 2000)
            
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                            {err && showErrMsg(err)}
                            {success && showSuccessMsg(success)}
                            <Form.Control 
                            name="username"
                            placeholder="Введите логин "
                            onChange={handleChangeInput}
                            />
                            <Form.Control  
                            name="password"
                            type="password"                   
                            onChange={handleChangeInput}
                            placeholder={"Введите пароль"}                                 
                            />
                            <Form.Control  
                            name="cf_password"
                            type="password"                   
                            onChange={handleChangeInput}
                            placeholder={"Введите пароль"}                                 
                            />
                            <Form.Control 
                            name="name" 
                            placeholder={"Введите Фамилию Имя Отчество"} 
                            onChange={handleChangeInput}                                 
                            />
                            <Button variant="primary" type="submit">Создать</Button>
                        </Form>
                    </Col>
            </Row>
            </Container>
        
    )
}

export default Register
