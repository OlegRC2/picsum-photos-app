export default class picService {
    constructor() {
        this._apiBase = 'https://picsum.photos/';
    }

    getResourse = async (width, height) => {
        const res = await fetch(`${this._apiBase}${width}/${height}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${width}/${height}, status: ${res.status}`);
        }
    
        return await res;
    }

    getRandomImg = async (width, height) => {
        const random = await this.getResourse(width, height);     
        return this._transrormRandom(random);
    }

    _transrormRandom = (random) => {
        const url = random.url;
        return url
    }
}