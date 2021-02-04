export default class SingleItem {
    constructor(id) {
        this.id = id;
    }

    // Метод для получения object с обьектом с сервера
    async getItem() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items/${this.id}`;
            const response = await fetch(queryString);
            const data = await response.json();
            this.result = await data; 
        } catch(error) {
            alert(error);
        }               
    }

    // Метод для отправки заявки на сервер
    async submitForm(formData) {
        const queryString = `http://jsproject.webcademy.ru/bidnew`;

        const response = await fetch(queryString, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();

        // Сохраняем ответ от сервера в свойство response
        this.response = await data;
    }

}