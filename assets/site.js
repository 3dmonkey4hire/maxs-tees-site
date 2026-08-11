// Max's Tees shared site JS — cart persists across pages via localStorage
const cart = JSON.parse(localStorage.getItem('mt_cart') || '{}');

function saveCart() { localStorage.setItem('mt_cart', JSON.stringify(cart)); }

function addToCart(name, price) {
  cart[name] = cart[name] || { price, qty: 0 };
  cart[name].qty++;
  saveCart();
  renderCart();
  toast(name + ' added to cart');
}

function renderCart() {
  let count = 0, sub = 0, html = '';
  for (const [name, item] of Object.entries(cart)) {
    count += item.qty; sub += item.qty * item.price;
    html += `<div class="ditem"><span>${name} <span class="qty">&times;${item.qty}</span></span><span>$${item.qty * item.price}</span></div>`;
  }
  document.getElementById('cartCount').textContent = count;
  document.getElementById('subtotal').textContent = '$' + sub;
  document.getElementById('ditems').innerHTML = html || '<div class="dempty">Your cart is empty — go find a shirt that says something.</div>';
}

function toggleDrawer() {
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('scrim').classList.toggle('show');
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', renderCart);
