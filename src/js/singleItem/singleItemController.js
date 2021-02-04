import SingleItem from './singleItemModel';
import * as view from './singleItemView';

export default async function(state) {

    // Создаем новый обьект singleItem
    state.singleItem = new SingleItem(state.routeParams);

    // Получаем данные с сервера
    await state.singleItem.getItem();

    // Рендерим разметку для отдельного обьекта 
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));    

    /* * * * * * * * * * * * * * * * * *
    * Запустить прослушку событий
    * * * * * * * * * * * * * * * * * * */

    // Открытие модального окна 
    document.querySelector('.button-order').addEventListener('click', ()=>{
        // Запускаем функцию для отображения модального окна, которое изначально скрыто 
        view.showModal();
    });

    // Закрытие модального окна - клик по кнопке
    document.querySelector('.modal__close').addEventListener('click', ()=>{
        // Запускаем функцию для отображения скрытия модального окна
        view.hideModal();
    });

    // Закрытие модального окна - клик по оверлею 
    document.querySelector('.modal-wrapper').addEventListener('click', (e)=>{
        if (!e.target.closest('.modal')) {
            view.hideModal();
        }
    });

    // Отправка формы
    document.querySelector('.modal__form').addEventListener('submit', async function(e) {
        e.preventDefault();
       
        // Получаем данные из формы модального окна
        const formData = view.getInput();

        if (formData.policy) {
            delete formData.policy;
            // Отправляем данные и получаем ответ
            await state.singleItem.submitForm(formData);

            // Получаем записанный ранее в state ответ от сервера и записываем в константу response
            const response = state.singleItem.response;

            if (response.message === 'Bid Created') {
                alert('Ваша заявка успешно добавлена');
                view.hideModal();
                view.clearInput();
            } else if (response.message === 'Bid Not Created') {
                response.errors.forEach((item) => {
                    alert(item);
                });
            }
        } else {
            alert(" Вам нужно согласиться на обработку персональных данных");
        }
        
    }); 

    // Клип по кнопке - Добавить в избранное
        
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        state.favourites.toggleFav(state.singleItem.id);

        // Метод для изменения класса и текста кнопки
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    });

}