import React, {Component} from 'react';
import picService from '../services/picService';
import './randomPic.scss';


export default class RandomPic extends Component {

    picService = new picService();

    state = {                                                                // изначально ставим пустой объект, т.к. при создании класса туда запишется Url рандомного изображения
        url: null,
        loading: true,                                                       // свойство для показа спиннера
        error: false
    }

    componentDidMount() {                                                   // вызывается, когда компонент успешно отрисован
        this.updatePic(400, 300);                                                  
        this.timerId = setInterval( () => {
            this.updatePic(400, 300)
        }, 5000);
    }

    componentWillUnmount() {                                                // вызывается, когда компонент был удален со страницы
        clearInterval(this.timerId);
    }

    onPicLoaded = (url) => {                                                // функция устанавливающая state
        this.setState({
            url,
            loading: false,                                                 // после загрузки персонажа ставим сюда false чтобы не показывать спиннер
            error: false                                                    // свойство на случай ошибок
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updatePic = (width, height) => {                                                     // стрелочная функция чтобы запустить в конструкторе setInterval, (чтобы был контекст вызова)
        this.picService.getRandomImg(width, height)                                       // функция выдаст уже трансформированный объект, трансформация в файле gotService
            .then(this.onPicLoaded)                                                              // обрабатываем вернувшийся промис и устанавливаем state
            .catch(this.onError);
    }

    render() {

        const { url, loading, error } = this.state;

        return (
            <div className="random-block">
                <img className="random-img" src={url}></img>
            </div>
        )
    }
}