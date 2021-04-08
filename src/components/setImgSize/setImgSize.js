import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import { Button } from 'reactstrap';
import picService from '../services/picService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './setImgSize.scss';

export default class ImgById extends Component {

    picService = new picService();

    state = {                                                                
        url: null,                                                               // изначально ставим пустой объект, т.к. при создании класса туда запишется Url рандомного изображения
        loading: false,                                                          // свойство для показа спиннера
        error: false,
        downloadBtnHidden: true,                                                 // кнопка "скачать изображение" скрыта
        noChoise: true,                                                          // изображение не выбрано - ничего не показываем
    }

    onGetImg = () => {
        const widthInput = document.querySelector('.input-width'),
              heigthInput = document.querySelector('.input-heigth');

        if (widthInput.value && heigthInput.value && widthInput.value != 0 && heigthInput.value != 0) {

            this.setState({
                loading: true                                                    // при нажатии кнопки выводим спиннер
            })

            this.picService.getRandomImg(widthInput.value, heigthInput.value)                    // функция выдаст уже трансформированный объект, трансформация в файле picService
            .then((res) => {
                this.onPicLoaded(res);
                widthInput.value = '';
                heigthInput.value = '';
            })                                                                   // обрабатываем вернувшийся промис и устанавливаем state
            .catch((res) => {
                this.onError(res);
                widthInput.value = '';
                heigthInput.value = '';
            });
        } else {
            this.onError();
            widthInput.value = '';
            heigthInput.value = '';
        }
    }

    onPicLoaded = (url) => {                                                     // функция устанавливающая state
        this.setState({
            url,
            loading: false,                                                      // после загрузки ставим сюда false чтобы не показывать спиннер
            error: false,                                                        // свойство на случай ошибок
            downloadBtnHidden: false,
            noChoise: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
            downloadBtnHidden: true,
            noChoise: true
        })
    }

    render() {

        const { url, loading, error, downloadBtnHidden, noChoise } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;                     // если возникла ошибка, то создаем компонент с ошибкой (из импортированного файла)

        const spinner = loading ? <Spinner/> : null;                             // если loading true, создаем компонент со спиннером

        const content = !(noChoise) ? <img className="random-img" src={url} alt="random"></img> : undefined;

        const btn = !downloadBtnHidden ? <a href={url} className="btn btn-primary set-size_btn-download" download target="_blank" rel="noreferrer">Download</a> : undefined;

        return (
            <>
                <Container>
                    <Row className="justify-content-between">

                        <Col lg={{size: 3}}>
                            <div className="set-size_form">
                                <div className="set-size_width">
                                    <div className="set-size_title-input">Enter width</div>
                                    <input className="set-size_input input-width" type="number"></input>
                                </div>

                                <div className="set-size_heigth">
                                    <div className="set-size_title-input">Enter heigth</div>
                                    <input className="set-size_input input-heigth" type="number"></input>
                                </div>

                                <Button 
                                    color="primary" 
                                    className="set-size_btn" 
                                    type="button"
                                    onClick={this.onGetImg}>Get image
                                </Button>
                                
                                {btn}
                            </div>
                        </Col>

                        <Col lg={{size: 9}}>
                            <div className="img-block">
                                {errorMessage}
                                {spinner}
                                {content}
                            </div>  
                        </Col>

                    </Row>
                   
                    <div className="set-size_title">Get a random image of a given width and height</div>
                </Container>
            </>
        )
    }
}