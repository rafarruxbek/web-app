document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  const menuItems = document.querySelectorAll('.add-to-cart');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalAmountElement = document.getElementById('total-amount');
  const checkoutButton = document.getElementById('checkout');
  let cart = [];
  let totalAmount = 0;

  menuItems.forEach(button => {
    button.addEventListener('click', () => {
      const menuItem = button.closest('.menu-item');
      const itemId = menuItem.dataset.id;
      const itemName = menuItem.querySelector('h3').innerText;
      const itemPrice = parseFloat(menuItem.querySelector('p').innerText.replace('$', ''));
      
      addItemToCart(itemId, itemName, itemPrice);
    });
  });

  function addItemToCart(id, name, price) {
    const cartItem = cart.find(item => item.id === id);
    
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    
    updateCart();
  }

  function updateCart() {
    cartItemsContainer.innerHTML = '';
    totalAmount = 0;
    
    cart.forEach(item => {
      totalAmount += item.price * item.quantity;
      
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    totalAmountElement.innerText = totalAmount.toFixed(2);
  }

  checkoutButton.addEventListener('click', () => {
    tg.sendData(JSON.stringify(cart)); // send cart data to Telegram
    tg.close();
  });
});
