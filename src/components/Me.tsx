import React from 'react';
import UserService from "../services/UserService";
import Container from "react-bootstrap/Container";
import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";

const Me = () => {
    return (
        <Container fluid>
            <h3>{UserService.getUsername()}</h3>
            <Row>
                <Col sm={12} md={6}>
                    <h4>Roles</h4>
                    <ListGroup>
                        {UserService.getRealmRoles()?.roles.map((role) => <ListGroupItem>{role}</ListGroupItem>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default Me
