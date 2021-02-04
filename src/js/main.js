import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel';

const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites()
};

// Тестирование , после удалить
window.state = state;

// Маршруты
const routes = {
    '/': homePage,
    'item': singleItem,
    'favourites': favouritesPage,
    'bids': bidsPage,
};

// function findComponentByPath(path, routes) {
//     return routes.find(function(route) {
//         return route.path === path;
//     });
// }

// Роутер
function router () {
    // index.html#/  				- главная (или index.html)
	// index.html#/item/item_id 	- страница с объектом
	// index.html#/bids 			- страница с заявками
	// index.html#/favourites 		- страница с избранным
	
    // index.html#/bids 
    // location.hash = #/bids
    // pathArray[0] = '#'   pathArray[1] = 'bids'

    // Разбиваем путь на массив 
    const pathArray = location.hash.split('/');

    //  Извлекаем название страницы из адреса
    const currentPath = pathArray[0] && pathArray[1] ? pathArray[1] : '/';

    // Сохраняем параметры компонента
    state.routeParams = pathArray[2] ? pathArray[2] : '';

    // Выбираем компонент для указанного адреса, либо компонент с ошибкой
    const component = routes[currentPath] || errorPage;
    
    // Запускаем рендер запрашиваемой страницы
    component(state);
}

// Запуск роутера
window.addEventListener('hashchange', router);
window.addEventListener('load', router);