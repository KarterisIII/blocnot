import React  from 'react'
// import axios from 'axios'
import {useSelector} from 'react-redux'
// import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

// import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'



function Profile()  {     
    
    const auth = useSelector(state => state.auth)   

    const {user} = auth    

        return (
            <Container>
            
                <div>
                    <Row>
                        <Col sm={5}>
                        <Card className="mb-5">
                            <Card.Header as="h5" className="d-flex justify-content-between" bg="danger"  >
                            {user.name} 
                            <Link to="/editeWorker" className="btn btn-primary">Редактировать</Link>                           
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                Дата рождения: <span>{user.dateBithd}</span>
                                </Card.Text>
                                <Card.Text>
                                Дата найма: <span>{user.jobWork}</span>
                                </Card.Text>
                                <Card.Text>
                                Адрес: <span>{user.addres}</span>
                                </Card.Text>
                                <Card.Text>
                                Комментарий: <span>{user.comment}</span>
                                </Card.Text>
                            </Card.Body>           
                        </Card>
                        </Col>
                        <Col sm={7}>
                        <Card>
                            <Card.Header as="h5" className="d-flex justify-content-between" bg="danger"  >
                                Коофициент: <span>1.5</span>
                                <Button variant="primary" >Редактировать</Button>
                            </Card.Header>
                            <Card.Body>                            
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.                                
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.                                
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.                                
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.                                
                                </Card.Text>                            
                            </Card.Body>                        
                        </Card>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                        <Card>
                            <Card.Header as="h5" className="d-flex justify-content-between" bg="danger"  >
                                    Основная работа
                                    <Button variant="primary"
                                    
                                    >Редактировать</Button>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>                        
                        </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Card>
                            <Card.Header as="h5" className="d-flex justify-content-between" bg="danger"  >
                                    Дополнительная работа
                                    <Button variant="primary"                                
                                    >Редактировать</Button>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                            
                        </Card>
                        </Col>
                    </Row> 
                </div>        
                                
            </Container>
    );
};

export default Profile;