class GoodsItem {
    constructor(title = 'Без имени', price = '') {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
                    <h3 class="title goods-title">${this.title}</h3>
                    <p>${this.price} ₽</p>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods()  {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 150 },
            { title: 'Jacket', price: 150 },
            { title: 'Shoes', price: 150 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    sumGoodsPrices() {
        let goodsCost = this.goods.reduce((sum, good) => 
            sum + good.price, 0);
        console.log(goodsCost);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumGoodsPrices();

class BacketGoodsItem {
    constructor(title = '', price = '', quantity = '') {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}
