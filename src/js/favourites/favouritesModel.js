export default class Favourites {
    constructor() {
        this.favs = this.readStorage();
    }

    addFav(id) {
        // Добавляем элемент в массив favs
        this.favs.push(id);
        // Сохранение в localstorage 
        this.saveData();
    }

    removeFav(id) {
        // Удаляем элемент в массиве 
        this.favs = this.favs.filter(cardId => cardId !== id);
        // Сохранение в localstorage 
        this.saveData();
    }

    isFav(id) {
        // Возвращает true или false
        return this.favs.indexOf(id) !== -1;
    }

    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }

    saveData() {
        localStorage.setItem('favs', JSON.stringify(this.favs));
    }

    readStorage() {
        return JSON.parse(localStorage.getItem('favs')) || [];
    }
}