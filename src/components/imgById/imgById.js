import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import { Button } from 'reactstrap';
import picService from '../services/picService';

import './imgById.scss';


export default class ImgById extends Component {

    picService = new picService();

    state = {                                                                
        url: null,                                                              // изначально ставим пустой объект, т.к. при создании класса туда запишется Url рандомного изображения
        loading: true,                                                          // свойство для показа спиннера
        error: false
    }

    render() {

        const { url, loading, error } = this.state;

        return (
            <>
                <Container>
                    <Row>
                        <Col lg={{size: 7, offset: 0}}>
                            <form className="form-id">
                                <div className="form-id_title">Enter image id</div>
                                <input className="form-id_input" type="number"></input>
                                <Button color="primary" className="btn btn-primary form-id_btn" type="submit">Get image</Button>
                            </form>               
                        </Col>

                        <Col lg={{size: 5, offset: 0}}>
                            <div className="random-block">
                                <img className="random-img" src={url}></img>;
                            </div>  
                        </Col>
                    </Row>
                </Container>
            </>
            
        )
    }
}