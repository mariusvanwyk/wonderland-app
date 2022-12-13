import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
        <Navbar bg={"dark"} variant={"dark"} expand={"lg"}>
            <Container fluid>
                <Navbar.Brand href="/home">Peter Pan | Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Text className="me-auto">

                    </Navbar.Text>
                    <Nav>
                        <Nav.Link href="/vehicle-categories">Vehicle Categories</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
