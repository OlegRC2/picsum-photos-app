import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import picService from '../services/picService';

import './imgInfo.scss';


export default class ImgInfo extends Component {

    picService = new picService();

    state = {
        info: {}
    }

    componentDidMount() {                                                       // вызывается, когда компонент успешно отрисован
        this.updateInfo();
    }

    componentDidUpdate(prevProps) {                                             // когда приходит новый пропс, то запускается этот хук
        if (this.props.idImg !== prevProps.idImg) {                             // сравниваем текущие пропсы с предыдущими и если она не совпадают, то
            this.updateInfo();                                                  // обновляем этот компонент
        }
    }

    newInfo = (info) => {
        this.setState({
            info
        })
    }

    updateInfo() {
        const {idImg} = this.props;
       
        if (!idImg) {                                                          // если переменная не передана, то ничего не делаем
            this.setState({
                info: {}
            })
            return;
        }

        this.picService.getImgInfo(idImg)
            .then(this.newInfo)                                               // обрабатываем вернувшийся промис и устанавливаем state
            .catch( () => console.log('err'));
    }

    render() {

        const {info} = this.state;
        const {id, author, width, height, download_url} = info;

        return (

            <Row className="justify-content-center">
                <Col lg={{size: 5, offset: 0}} className="text-center">
                    <div className="info_title">Image information</div>
                    <ul className="info_img">
                        <li>
                            Image id: {id}
                        </li>
                        <li>
                            Autor: {author}
                        </li>
                        <li>
                            Width: {width}
                        </li>
                        <li>
                            Height: {height}
                        </li>
                    </ul>
                    <a href={download_url} className="btn btn-primary" download target="_blank" rel="noreferrer">Download</a>
                </Col>
            </Row>
        )    
    }
}