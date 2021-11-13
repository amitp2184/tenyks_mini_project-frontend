import { Container } from 'react-bootstrap';
import React, { Component } from 'react'
import Resource from '../components/Resource';
export default class FrontLayout extends Component {
    render() {
        return (
             <Container>
             <Resource />   
            </Container>
        )
    }
}
