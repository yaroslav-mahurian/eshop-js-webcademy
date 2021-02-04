import favouritesCards from './../favouritesCards/favouritesCardsController';

export default function() {
    // очищаем контейнер приложения
    document.querySelector('#app').innerHTML = '';

    favouritesCards(state);
}