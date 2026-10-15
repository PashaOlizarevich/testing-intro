function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new RangeError('Количество товара должно быть положительным числом.');
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const totalQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (totalQuantity > product.stock) {
    throw new RangeError('Количество товара не может превышать остаток на складе.');
  }

  if (existingItem) {
    return cart.map((item) => item.id === product.id ? { ...item, quantity: totalQuantity } : item);
  }

  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, id, quantity) {
  const existingItem = cart.find((item) => item.id === id);

  if (!existingItem) return cart;

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new RangeError('Количество товара должно быть положительным числом.');
  }

  if (quantity > existingItem.stock) {
    throw new RangeError('Количество товара не может превышать остаток на складе.');
  }

  return cart.map((item) => item.id === id ? { ...item, quantity } : item);
}
function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
