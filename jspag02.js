document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('productList');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        addProduct(productName, expiryDate);
    });

    function addProduct(name, expiryDate) {
        const product = { id: Date.now(), name, expiryDate };
        products.push(product);
        saveProducts();
        renderProductList();
        productForm.reset();
    }

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexado
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function renderProductList() {
        // Ordenar produtos por data de validade
        products.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

        productList.innerHTML = '';
        products.forEach(product => {
            const formattedDate = formatDate(product.expiryDate);
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="product-info">
                    <strong>${product.name}</strong>
                    <small>Validade: ${formattedDate}</small>
                </div>
                <div class="product-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})">Editar</button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">Excluir</button>
                </div>
            `;
            productList.appendChild(li);
        });
    }

    window.editProduct = function(id) {
        const product = products.find(p => p.id === id);
        document.getElementById('productName').value = product.name;
        document.getElementById('expiryDate').value = product.expiryDate;
        deleteProduct(id);
    }

    window.deleteProduct = function(id) {
        products = products.filter(product => product.id !== id);
        saveProducts();
        renderProductList();
    }

    // Render the product list on initial load
    renderProductList();
});
