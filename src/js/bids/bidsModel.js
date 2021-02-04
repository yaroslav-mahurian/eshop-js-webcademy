export default class Bids {
    constructor() {

    }

    async getBids() {
        try {
            const queryString = `http://jsproject.webcademy.ru/bids`;
            const result = await fetch(queryString);
            const data = await result.json();
            this.bidsArray = await data;
        } catch (error) {
            alert('Error with getting bids');
            console.log(error);
        }
        
    }
}