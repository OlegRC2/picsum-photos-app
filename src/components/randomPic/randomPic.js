import React, {Component} from 'react';
import picService from '../services/picService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './randomPic.scss';


export default class RandomPic extends Component {

    picService = new picService();

    state = {                                                                
        url: null,                                                              // изначально ставим пустой объект, т.к. при создании класса туда запишется Url рандомного изображения
        loading: true,                                                          // свойство для показа спиннера
        error: false,
        noChoise: true,                                                         // изображение не выбрано - ничего не показываем
    }

    componentDidMount() {                                                       // вызывается, когда компонент успешно отрисован
        this.updatePic(400, 300);                                                  
        this.timerId = setInterval( () => {
            this.updatePic(400, 300)
        }, 5000);
    }

    componentWillUnmount() {                                                    // вызывается, когда компонент был удален со страницы
        clearInterval(this.timerId);
    }

    onPicLoaded = (url) => {                                                    // функция устанавливающая state
        this.setState({
            url,
            loading: false,                                                     // после загрузки ставим сюда false чтобы не показывать спиннер
            error: false,                                                       // свойство на случай ошибок
            noChoise: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
            noChoise: true
        })
    }

    updatePic = (width, height) => {                                            // стрелочная функция чтобы запустить в конструкторе setInterval, (чтобы был контекст вызова)
        this.picService.getRandomImg(width, height)                             // функция выдаст уже трансформированный объект, трансформация в файле picService
            .then(this.onPicLoaded)                                             // обрабатываем вернувшийся промис и устанавливаем state
            .catch(this.onError);
    }

    render() {

        const { url, loading, error, noChoise } = this.state;

        let id = 0; 

        if (url) {                                                              // если url передан
            const urlId = url.match(/\d+/g);                                    // вырезаем из url все цифры
            id = +urlId[0].replace(/\D/g, '');                                  // из получившегося массива берем первый элемент - это id изображения
        }
        

        const errorMessage = error ? <ErrorMessage/> : null;                    // если возникла ошибка, то создаем компонент с ошибкой (из импортированного файла)

        const spinner = loading ? <Spinner/> : null;                            // если loading true, создаем компонент со спиннером

        const content = !(noChoise) ?
            <>
                <img className="random-img" src={url} alt="random"></img>
                <div className="random-img_id">Image id: {id}</div>
            </> : undefined;

        return (
            <div className="random-block">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}