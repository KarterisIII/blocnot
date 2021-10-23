import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function Header() {
    const auth = useSelector(state => state.auth)
    // console.log(auth)

    const {user, isLogged, isAdmin} = auth

    const handleLogout = async () => {
        try {
            await axios.get('https://blocnot.herokuapp.com/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    { 
                    isAdmin ? 
                    <Link to="/admin" className="dropdown-item">Профиль</Link>
                    :
                    <Link to="/profile" className="dropdown-item">Профиль</Link>
                    }                        
                    <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <Navbar bg="danger" variant="dark" className="mb-5">
            <Container>
            <Navbar.Brand>Блокнот</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                {
                    isLogged
                    ? userLink()
                    :<Link to="/login" className="btn btn-primary">Войти</Link>
                }
                    {/* <Button variant="primary"
                    
                    >Выход</Button> */}
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header