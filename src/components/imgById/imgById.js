import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import { Button } from 'reactstrap';
import picService from '../services/picService';
import ImgInfo from '../ImgInfo';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './imgById.scss';
import '../randomPic/randomPic.scss';


export default class ImgById extends Component {

    picService = new picService();

    state = {                                                                
        url: null,                                                               // изначально ставим пустой объект, т.к. при создании класса туда запишется Url рандомного изображения
        loading: false,                                                          // свойство для показа спиннера
        error: false,   
        noChoise: true,                                                          // изображение не выбрано - ничего не показываем
        id: undefined
    }

    onGetImgById = () => {

        const idInput = document.querySelector('.form-id_input');

        if (idInput.value && idInput.value != 0) {

            this.setState({
                loading: true,                                                   // при нажатии кнопки выводим спиннер
                id: idInput.value
            })

            this.picService.getIdImg(400, 300, idInput.value)                    // функция выдаст уже трансформированный объект, трансформация в файле picService
            .then((res) => {
                this.onPicLoaded(res);
                idInput.value = '';
            })                                                                   // обрабатываем вернувшийся промис и устанавливаем state
            .catch((res) => {
                this.onError(res);
                idInput.value = '';
            });
        } else {
            this.onError();
            idInput.value = '';
        }
    }

    onPicLoaded = (url) => {                                                     // функция устанавливающая state
        this.setState({
            url,
            loading: false,                                                      // после загрузки ставим сюда false чтобы не показывать спиннер
            error: false,                                                         // свойство на случай ошибок
            noChoise: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
            id: undefined,
            noChoise: true
        })
    }

    render() {

        const { url, loading, error, noChoise } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;                     // если возникла ошибка, то создаем компонент с ошибкой (из импортированного файла)

        const spinner = loading ? <Spinner/> : null;                             // если loading true, создаем компонент со спиннером

        const content = !(noChoise) ? <img className="random-img" src={url} alt="img by id"></img> : undefined;

        return (
            <>
                <Container>
                    <Row className="justify-content-between">
                        <Col lg={{size: 5, offset: 0}}>
                            
                            <div className="form-id_title">Enter image id</div>
                            <input className="form-id_input" type="number" placeholder="1-1084"></input>
                            <Button 
                                color="primary" 
                                className="btn btn-primary form-id_btn" 
                                type="button"
                                onClick={this.onGetImgById}>Get image</Button>
                                        
                        </Col>

                        <Col lg={{size: 5, offset: 0}}>
                            <div className="random-block">
                                {errorMessage}
                                {spinner}
                                {content}
                            </div>  
                        </Col>
                    </Row>

                    <ImgInfo
                        idImg={this.state.id}/>
                     
                </Container>
            </>
        )
    }
}