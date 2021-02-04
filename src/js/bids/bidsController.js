import * as view from './bidsView';
import Bids from './bidsModel';

export default async function (state) {
    // Проверяем пустой ли state.bids
    if (!state.bids) {
        // Создаем объект модели для работы с заявками
        state.bids = new Bids();
    }
    // Запускаем метод который запрашивает заявки на сервере и сохраняет в объект данного компонента - свойство bids 
    await state.bids.getBids();

    // Отображаем заявки на странице
    view.renderBids(state.bids.bidsArray);
}