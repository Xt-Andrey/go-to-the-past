document.addEventListener('DOMContentLoaded', function() {
    // Carrito de compras
    let cart = [];
    const cartButton = document.getElementById('cart-button');
    const cartPanel = document.getElementById('cart-panel');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Mostrar/Ocultar panel del carrito
    cartButton.addEventListener('click', function() {
        cartPanel.style.display = 'block';
        cartPanel.classList.add('animate__animated', 'animate__fadeInRight');
    });
    closeCart.addEventListener('click', function() {
        cartPanel.classList.remove('animate__fadeInRight');
        cartPanel.classList.add('animate__fadeOutRight');
        setTimeout(() => {
            cartPanel.style.display = 'none';
            cartPanel.classList.remove('animate__animated', 'animate__fadeOutRight');
        }, 400);
    });

    // Agregar producto al carrito
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const img = this.closest('.card').querySelector('img').src;
            // Buscar si ya está en el carrito
            const found = cart.find(item => item.name === name);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ name, price, qty: 1, img });
            }
            updateCart();
            showAddedToast(name);
        });
    });

    // Actualizar el carrito visualmente
    function updateCart() {
        // Actualizar contador
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = totalItems;

        // Listar productos
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
            const li = document.createElement('li');
            li.className = "mb-3 d-flex align-items-center border-bottom pb-2";
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}" style="width:40px; height:40px; object-fit:cover; border-radius:8px; margin-right:10px;">
                <div class="flex-grow-1">
                    <strong>${item.name}</strong><br>
                    <small>Cantidad: ${item.qty}</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-success">$${(item.price * item.qty).toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger ms-2 remove-item" data-name="${item.name}">&times;</button>
                </div>
            `;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total.toFixed(2);

        // Botones para eliminar
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                cart = cart.filter(item => item.name !== name);
                updateCart();
            });
        });
    }

    // Toast visual para producto añadido
    function showAddedToast(productName) {
        let toast = document.createElement('div');
        toast.className = "position-fixed top-0 end-0 m-4 p-3 bg-success text-white rounded shadow animate__animated animate__fadeInDown";
        toast.style.zIndex = 2000;
        toast.innerHTML = `<strong>¡${productName} añadido al carrito!</strong>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('animate__fadeInDown');
            toast.classList.add('animate__fadeOutUp');
            setTimeout(() => document.body.removeChild(toast), 800);
        }, 1200);
    }
});