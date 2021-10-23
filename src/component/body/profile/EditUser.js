import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'


function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])
    
    const users = useSelector(state => state.users)
    

    const [setCheckAdmin] = useState(false)
    

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        }else{
            history.push('/profile')
        }
    },)

    

    return (       
        <Container>
            <Row>
                <Col className="mb-5">
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Button variant="secondary" onClick={() => history.goBack()} >назад</Button>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    {editUser.name}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check type="checkbox" label="Сделать админам" />
                </Col>
            </Row>
        </Container>
    )
}

export default EditUser
