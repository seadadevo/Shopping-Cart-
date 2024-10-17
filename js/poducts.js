const productList = document.getElementById('productList');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" class="product-image" alt="${product.title}" />
      <div class="product-info">
        <h3>${product.title}</h3>
        <p class="description">${product.description}</p>
        <span class="product-price">Price: $${product.price}</span>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        <span class="read-more" onclick="toggleDescription(this)">Read More</span>
      </div>
    `;
    productList.appendChild(productCard);
  });

  addCartFunctionality();
}

function toggleDescription(element) {
  const description = element.previousElementSibling;
  if (description.style.overflow === 'hidden') {
    description.style.overflow = 'visible';
    description.style.display = 'block';
    element.innerText = 'Read Less';
  } else {
    description.style.overflow = 'hidden';
    description.style.display = '-webkit-box';
    element.innerText = 'Read More';
  }
}


function addCartFunctionality() {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      const product = cart.find((p) => p.id === productId);

      if (product) {
        product.quantity += 1;
      } else {
        cart.push({ id: productId, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
      
      window.location.href = 'shoppingCart.html';
    });
  });
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('cart');
  window.location.href = 'login.html';
});

fetchProducts();
