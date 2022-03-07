// import Rating from '../components/Rating';
// import { getProducts } from '../api';
// import { parseRequestUrl } from '../utils';

// import data from '../data.js'

import axios from 'axios';

const HomeScreen = {
  render: async () => {
    // const { value } = parseRequestUrl();
     const response = await axios({
       url:"http://localhost:9000/api/products",
       headers: {
         'Content-Type': 'application/json',
       }
     });
    // const {products} = data;
    if(!response || response.statusText !== 'OK') {
      return `<div class="error">Error in geting data</div>`;
    }
    const products =  response.data;
    // if (products.error) {
    //   return `<div class="error">${products.error}</div>`;
    // }

    return `
    <ul class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
          </a>
        </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
          $${product.price}
        </div>
        </div>
      </li>
      `
        )
        .join('\n')}
    `;
  },
};

export default HomeScreen;
