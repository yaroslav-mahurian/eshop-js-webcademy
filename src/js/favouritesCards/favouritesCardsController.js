import FavouritesCards from "./favouritesCardsModel";
import * as view from "./favouritesCardsView";

export default async function(state) {

    // Получаем список id объектов которые находятся в избранном
    const favsList = state.favourites.favs;
    
    const favouriteCards = new FavouritesCards(favsList);

    // Получаем массив с избранными заявками, полученный с сервера
    await favouriteCards.getFavs();

    // Отображаем контейнер и карточки
    view.renderPage(favouriteCards.cards);

    // Запускаем прослушку клика на иконки "добавить в избранное"
    addToFavListener(); 

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