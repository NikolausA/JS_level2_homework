const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//const cart = [];

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
    </div>
  `,
});

Vue.component('goods-list', {
  props: ['goods'],
  computed: {
    isGoodsEmpty() {
      return this.goods.length === 0;
    }
  },
  template: `
    <div class="goods-list" v-if="!isGoodsEmpty">
      <goods-item v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
    </div>
    <div class="not-found-items" v-else>
      <h2>Нет данных</h2>
    </div>
  `
});

Vue.component('cart', {
    props: [],
    methods: {
        toggleCartVisibility() {
        this.isVisibleCart = !this.isVisibleCart;
        },
    },
    template: `
        <div class="cart-container">
            <button class="cart-button" @click="toggleCartVisibility">Корзина</button>
            <div class="cart-box" v-if="isVisibleCart">
        </div>
    `
});

Vue.component('search', {
    props: '',
    computed: {
        filteredGoods() {
            const regexp = new RegExp(searchValue, 'i');
            return this.goods.filter((good) => regexp.test(good.product_name));
        },
    },
    template: `
        <form class="search-form" @submit.prevent>
            <input type="text" class="search-input" v-model.trim="searchLine"/>
        </form>
    `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const body = JSON.parse(xhr.responseText);
              resolve(body)
            } else {
              reject(xhr.responseText);
            }
          }
        };
        xhr.onerror = function (err) {
          reject(err);
        };

        xhr.open('GET', url);
        xhr.send();
      });
    },
//    toggleCartVisibility() {
//      this.isVisibleCart = !this.isVisibleCart;
//    },
  },
//  computed: {
//    filteredGoods() {
//      const regexp = new RegExp(searchValue, 'i');
//      return this.goods.filter((good) => regexp.test(good.product_name));
//    },
//  },
  async mounted() {
    try {
      this.goods = await this.makeGETRequest(`${API_URL}/catalogData.json`);
    } catch (e) {
      console.error(e);
    }
  }
});