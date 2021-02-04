export default class FavouritesCards {
    constructor(favsList) {
        this.favsList = favsList;
    }
    async getFavs() {
        // Преобразуем массив favsList в строку для формирования строки запроса
        const ids = this.favsList.toString();

        if (ids) {
            try {   
                const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`;
                const result = await fetch(queryString);
                const data = await result.json();
                this.cards = await data;
            } catch(error) {
                alert(error);
            }
        }
    }
}