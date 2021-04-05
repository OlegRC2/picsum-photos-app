import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import { Button } from 'reactstrap';
import picService from '../services/picService';

import './imgInfo.scss';


export default class ImgInfo extends Component {

    picService = new picService();

    state = {
        info: null
    }

    componentDidMount() {                                                       // вызывается, когда компонент успешно отрисован
        this.updateInfo();
    }

    componentDidUpdate(prevProps) {                                             // когда приходит новый пропс, то запускается этот хук
        if (this.props.idImg !== prevProps.idImg) {                             // сравниваем текущие пропсы с предыдущими и если она не совпадают, то
            this.updateInfo();                                                  // обновляем этот компонент
        }
    }


    render() {

        const {idImg} = this.props;

        return (

            <Row className="justify-content-center">
                <Col lg={{size: 5, offset: 0}} className="text-center">
                    <div className="info_title">Image information</div>
                    <ul className="info_img">
                        <li>
                            Image id: {idImg}
                        </li>
                        <li>
                            Autor: 111
                        </li>
                        <li>
                            Width: 111
                        </li>
                        <li>
                            Height: 111
                        </li>
                    </ul>
                    <Button 
                        color="primary" 
                        className="btn btn-primary info_btn" 
                        type="button">Download</Button>
                </Col>
            </Row>
        )    
    }
}