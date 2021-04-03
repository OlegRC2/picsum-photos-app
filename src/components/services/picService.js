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

        if (id === 0) {
            const res = await fetch(`${this._apiBase}${width}/${height}`);

            fetchError(res);

            return await res;

        } else {
            const res = await fetch(`${this._apiBase}${id}/${width}/${height}`);

            fetchError(res);

            return await res;
        }
    }

    getRandomImg = async (width, height) => {
        const random = await this.getResourse(width, height);     
        return this._transrormUrlImg(random);
    }

    _transrormUrlImg = (imgObj) => {
        const url = imgObj.url;
        return url
    }

    getIdImg = async (width, height, id) => {
        const idImg = await this.getResourse(width, height, id);   
        return this._transrormUrlImg(idImg);
    }
}