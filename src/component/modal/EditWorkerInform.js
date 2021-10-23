import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
// import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers } from '../../redux/actions/userAction'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function EditWorkerInform() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    // const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, addres, dateBithd, jobWork, comment, err, success} = data

   
    // const [loading, setLoading] = useState(false)
    // const [callback, setCallback] = useState(false)
    const [loading] = useState(false)
    const [callback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }  

    const updateInfor = () => {
        try {
            axios.patch('https://blocnot.herokuapp.com/user/update', {
                name: name ? name : user.name,
                addres: addres ? addres : user.addres,
                dateBithd: dateBithd ? dateBithd : user.dateBithd,
                jobWork: jobWork ? jobWork : user.jobWork,
                comment: comment ? comment : user.comment
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('https://blocnot.herokuapp.com/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || addres || dateBithd || jobWork || comment) updateInfor()
        if(password) updatePassword()
    }   
    return (
        <Container>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
            <Row>
                <Col>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Редактировать Фимилью Имя Отчество</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="name" onChange={handleChange} defaultValue={user.name}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Редактировать адрес проживания</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="addres" onChange={handleChange} defaultValue={user.addres}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Редактировать дату рождения</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="dateBithd" onChange={handleChange} defaultValue={user.dateBithd}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Редактировать Дата приема на работу</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="jobWork" onChange={handleChange} defaultValue={user.jobWork}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Изменить комментарий</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="comment" onChange={handleChange} defaultValue={user.comment} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Изменить пароль</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="password" type="password" onChange={handleChange}/>
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Продублируйте пароль</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="cf_password" type="password" onChange={handleChange}/>
                </InputGroup>
                <Button variant="primary" disabled={loading} onClick={handleUpdate} >Primary</Button>
                </Col>
            </Row>
        </Container>

    )
}

export default EditWorkerInform
