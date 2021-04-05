export default class picService {
    constructor() {
        this._apiBase = 'https://picsum.photos/';
    }

    getResourse = async (width, height, id = 0) => {

        function fetchError(obj) {
            if (!obj.ok) {
                throw new Error(`Could not fetch, status: ${obj.status}`);
            }
        }

        if (id === 0) {                                                                     // если id = 0, выводим случайное изображение
            const res = await fetch(`${this._apiBase}${width}/${height}`);

            fetchError(res);

            return await res;

        } else {                                                                            // если id передано, то выводим изображение по id
            const res = await fetch(`${this._apiBase}/id/${id}/${width}/${height}`);

            fetchError(res);

            return await res;
        }
    }

    getRandomImg = async (width, height) => {                                               // получаем рандомное изображение
        const random = await this.getResourse(width, height);     
        return this._transrormUrlImg(random);                                               // из ответа берем только url
    }

    _transrormUrlImg = (imgObj) => {                                                        // вытаскиваем url из ответа сервера
        const url = imgObj.url;
        return url
    }

    getIdImg = async (width, height, id) => {                                               // получаем изображение по id
        const idImg = await this.getResourse(width, height, id);   
        return this._transrormUrlImg(idImg);
    }

    getImgInfo = async (id) => {                                                            // получаем информацию об изображении

        function fetchError(obj) {
            if (!obj.ok) {
                throw new Error(`Could not fetch, status: ${obj.status}`);
            }
        }

        const res = await fetch(`${this._apiBase}id/${id}/info`);

        fetchError(res);

        return await this._transrormImgInfo(res);
    }

    _transrormImgInfo = (imgObj) => {                                                        // вытаскиваем url из ответа сервера
        for (let key in imgObj) {                                                            // перебор объекта как forEach, только для объекта
            imgObj[key] = imgObj[key] === '' ? 'no data' : imgObj[key]
        }

        return {
            id: imgObj.id,
            author: imgObj.author,
            width: imgObj.width,
            height: imgObj.height,
            download_url: imgObj.download_url
        }
    }
    
}