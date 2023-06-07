export default class Section {
    constructor(data, containerSelector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._currentUserId = data.currentUserid;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(this._containerSelector);
    }
    renderAll = () => {
        this._items.forEach((item) => {
            item.currentUserId = this._currentUserId;
            const cardElement = this._renderer(item);
            this._container.append(cardElement);
          });
    }
    addItem = (item) => {
        this._container.prepend(item); 
    }
}