const cartItems = document.getElementById('cartItems');
const totalPriceDisplay = document.getElementById('total');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json(); 
    renderCart();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}


function renderCart() {
  cartItems.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (product) {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');
      cartItemDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="cart-item-details">
          <h3>${product.title}</h3>
          <span class="price">$${product.price}</span>
        </div>
        <div class="quantity-controls">
          <button class="decrease" data-id="${cartItem.id}">-</button>
          <span>${cartItem.quantity}</span>
          <button class="increase" data-id="${cartItem.id}">+</button>
        </div>
      `;
      cartItems.appendChild(cartItemDiv);
      totalPrice += product.price * cartItem.quantity;
    }
  });

  totalPriceDisplay.innerText = totalPrice.toFixed(2);
  addQuantityControls();
}

// ! Quantity controls logic
function addQuantityControls() {
  document.querySelectorAll('.decrease').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1; 
        } else {
          const index = cart.indexOf(cartItem);
          cart.splice(index, 1); 
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCart(); 
      }
    });
  });

  document.querySelectorAll('.increase').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-id'));
      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity += 1; 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCart(); 
      }
    });
  });
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('cart'); 
  window.location.href = 'login.html';
});

fetchProducts();
