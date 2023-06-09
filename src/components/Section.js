export default class Section {
    constructor(data) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._currentUserId = data.currentUserid;
    }
    renderAll = () => {
        this._items.forEach((item) => {
            this._renderer(item);
          });
    }
    addItem = (item) => {
        this._container.prepend(item); 
    }
}