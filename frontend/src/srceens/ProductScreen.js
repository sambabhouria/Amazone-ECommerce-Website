import { getProduct } from '../api';
import {parseRequestUrl} from '../utils'
import Rating from '../components/Rating';

const ProductScreen = {

  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });

    if (document.getElementById('review-form')) {
      document
        .getElementById('review-form')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          showLoading();
          const data = await createReview(request.id, {
            comment: document.getElementById('comment').value,
            rating: document.getElementById('rating').value,
          });
          hideLoading();
          if (data.error) {
            showMessage(data.error);
          } else {
            showMessage('Review Added Successfully', () => {
              rerender(ProductScreen);
            });
          }
        });
    }
  },

    render: async() => {
      const request = parseRequestUrl();
      const product = await getProduct(request.id);
      console.log("🚀 ~ file: ProductScreen.js ~ line 9 ~ render:async ~ product", product)
      if(product.error){
        return `<div>${product.error}</div>`;
      }

      return `
      <div class="content">

        <div class="back-to-result">
          <a href="/#/">Back to result </a>
        </div>

        <div class="details">
          <div class="details-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`,
              })}
              </li>
              <li>
                Price: <strong>$${product.price}</strong>
              </li>
              <li>
                Description:
                <div>
                  ${product.description}
                </div>
              </li>
            </ul>
          </div>
          <div class="details-action">
            <ul>
              <li>
                Price: $${product.price}
              </li>
              <li>
                Status :
                  ${
                    product.countInStock > 0
                      ? `<span class="success">In Stock</span>`
                      : `<span class="error">Unavailable</span>`
                  }
              </li>
              <li>
                  <button id="add-button" class="fw primary">Add to Cart </div>
              </li>
            </ul>
          </div>
        </div>

      </div>`;
    },
  };
  export default ProductScreen;
