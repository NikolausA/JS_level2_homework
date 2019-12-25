//const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//const makeGETRequest = (url, callback) => {
//    let xhr;
//    return new Promise((resolve, reject) => {
//        setTimeout(() => {
//            if (window.XMLHttpRequest) {
//                xhr = new window.XMLHttpRequest();
//            } else {
//                xhr = new window.activeXObject('Microsoft.XMLHTTP');
//            }
//            xhr.onreadystatechange = function () {
//                if (xhr.readyState === 4 && xhr.status === 200) {
//            const body = JSON.parse(xhr.responseText);
//            callback(body)
//            } else {
//                reject('Error')
//            }
//        };
//        xhr.open('GET', url);
//        xhr.send();
//        }, 500);
//    });   
//}
//
//class GoodsItem {
//    constructor(title = 'Без имени', price = '') {
//        this.title = title;
//        this.price = price;
//    }
//    render() {
//        return `<div class="goods-item">
//                    <h3 class="title goods-title">${this.title}</h3>
//                    <p>${this.price} ₽</p>
//                    <button class="to-cart">В корзину</button>
//                </div>`;
//    }
//}
//
//class GoodsList {
//    constructor() {
//        this.goods = [];
//    }
//    fetchGoods(cb)  {
//        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//            this.goods = goods;
//            cb();
//        });
//    }
//    render() {
//        let listHtml = '';
//        this.goods.forEach(good => {
//            const goodItem = new GoodsItem(good.product_name, good.price);
//            listHtml += goodItem.render();
//        });
//        document.querySelector('.goods-list').innerHTML = listHtml;
//    }
//    sumGoodsPrices() {
//        return this.goods.reduce((sum, good) => { 
//        if (good.price) sum += good.price; 
//        return sum;
//        }, 0);
//    }
//}
//
//class CartItem extends GoodsItem {
//    constructor(props) {
//        super(props);
//    }
//    delete() {}
//}
//
//class Cart extends GoodsList {
//    constructor(props) {
//        super(props);
//    }
//    clean() {}
//    incGood() {}
//    decGood() {}
//}

//const list = new GoodsList();
//list.fetchGoods(() => {
//    list.render();
//});
//console.log(list.sumGoodsPrices());

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
    },
    metods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                let xhr;
                if(window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest();
                } else {
                    xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
                }
                xhr.onreadystatechange = function() {
                    if(xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            const body = JSON.parse(xhr.responseTextext);
                        resolve(body)
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.onerror = function(err) {
                    reject(err);
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filterGoods = this.goods.filter((good) => regexp.test(good.product_name));
        },
        toggleCartVisibility() {
            this.isVisibleCart = !this.isVisibleCart;
        }
    },
    computed: {
        isFilteredGoodsEmpty() {
            return this.filteredGoods.length === 0;
        }
    }
    async mounted() {
        try {
            this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
            this.filteredGoods = [...this.goods];
        } catch(e) {
            console.error(e);
        }
    }
});