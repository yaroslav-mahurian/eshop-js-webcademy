import bids from './../bids/bidsController';

export default function(state) {
    // очищаем контейнер
    document.querySelector('#app').innerHTML = '';

    // Запускаем компонент bids 
    bids(state);
}