import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserService from "../../services/UserService";
import {NavDropdown} from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
            <Container fluid>
                <Navbar.Brand href="/home">Peter Pan | Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Text className="me-auto">
                    </Navbar.Text>
                    {UserService.isAdmin() &&
                        <Nav>
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/vehicle-categories">Vehicle Categories</NavDropdown.Item>
                                <NavDropdown.Item href="/vehicles">Vehicles</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/customers">Customers</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    }
                    {UserService.isLoggedIn() &&
                        <Nav>
                            <Nav.Link href="/me">
                                <i className={"bi bi-person-circle"}/>
                                <span className={"ms-1"}>{UserService.getUsername()}</span>
                            </Nav.Link>
                            <Nav.Link onClick={() => UserService.doLogout()}>
                                <i className="bi bi-box-arrow-right"></i>
                                <span className={"ms-1"}>Logout</span>
                            </Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
