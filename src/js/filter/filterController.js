import Filter from './filterModel';
import * as view from './filterView';



export default async function(state) {

    // Создаем объект фильтра и записываем его в state приложения
    if (!state.filter) state.filter = new Filter();

    // Получение параметров для фильтра
    await state.filter.getParams();

    // Записываем результаты в state, массив results
    view.render(state.filter.params);

    // Делаем запрос на сервер
    await state.filter.getResults();

    state.results = state.filter.result;


    // Обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length);

    // Прослушка событий формы
    // Изменение формы
    const form = document.querySelector("#filter-form");
    form.addEventListener('change', async function(e) {
        e.preventDefault();
        // Вызываем функицю getInput, она возращает строку с запросом, его записываем в state.filter и новое свойство query. 
        state.filter.query = view.getInput();
        await state.filter.getResults();
        // Записываем результаты в state, массив results
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);

    });
    // Сброс формы
    form.addEventListener('reset', async function() {
        state.filter.query = "";
        await state.filter.getResults();
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);
    });

    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Обращаемся к классу eventEmitter и создаем событие  
        state.emitter.emit('event:render-listing', {});
    });

}