import * as view from './listingView';

export default function(state) {
    // Рендер контейнера для карточек
    view.render();

    // Рендер карточек
    state.results.forEach(function(item) {
        view.renderCard(item, state.favourites.isFav(item.id));
    });

    // Запускаем прослушку клика на иконки "добавить в избранное"
    addToFavListener();

    // Описываем прослушку события render-listing
    state.emitter.subscribe('event:render-listing', () => {
        // Очищаем контейнер с карточками 
        view.clearListingContainer();

        // Рендерим карточки
        state.results.forEach(function(item) {
            view.renderCard(item, state.favourites.isFav(item.id));  
        });

        // Запускаем прослушку клика на иконки "добавить в избранное"
        addToFavListener();

    });
    
    // Функция для работы иконок "добавить в избранное"
    function addToFavListener() {
        // Собираем все кнопки "добавить в избранное в массив и вешаем на них прослушку по клику
        Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Записываем в currentId значение из аттрибута data-id карточки
                const currentId = e.target.closest('.card').dataset.id;
    
                // Запускаем метод для добавления / удаления карточки из избранного
                state.favourites.toggleFav(currentId);
    
                // Вызываем фнкцию из view для переключения вида иконки
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
    
            });
        });
    }
    
    

}