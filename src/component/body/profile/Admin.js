import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
// import {isLength, isMatch} from '../../utils/validation/Validation'
// import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
// import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { dispatchGetAllUsers, fetchAllUsers } from './../../../redux/actions/userAction'
import Table from 'react-bootstrap/Table'





function Admin()  {   
    
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {isAdmin} = auth
   

    
    const [callback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])
    
      

      

        return (
            <Container>
                <Row >
                <Col sm={12}>                
                    <Card className="mb-5">
                        <Card.Header className="d-flex justify-content-between">
                        Типы работ
                        <Link to="/register" className="btn btn-primary">Создание типов работ</Link>
                        </Card.Header>
                        <Card.Body>                      
                                                     
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                        Список работников
                        <Link to="/register" className="btn btn-primary">Создание работника</Link>
                        </Card.Header>
                        <Card.Body> 
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ф.И.О</th>
                                    <th>Логин</th>
                                    <th>Сумма</th>
                                    <th>Роль</th>
                                    <th>Редактировать</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(user => (
                                <tr key={user._id}>
                                    <td>{new Date(user.date).toLocaleDateString()}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.cash}</td>
                                    <td>
                                        {
                                            user.role === 1
                                            ? <span>admin</span>
                                            : <span>user</span>
                                        }
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/edit_user/${user._id}`} className="btn btn-light">редактировать</Link>
                                    </td>
                                </tr>
                                ) )                                
                            }
                                                                
                            </tbody>
                            </Table>                                                     
                        </Card.Body>
                    </Card>
                </Col>
            </Row>                              
            </Container>
    );
};

export default Admin;