document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    
    if (productName && expiryDate) {
        addProductToList(productName, expiryDate);
        
        // Limpar os campos do formulário
        document.getElementById('product-form').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function addProductToList(productName, expiryDate) {
    const productList = document.getElementById('productList');
    const listItem = document.createElement('li');
    
    listItem.innerHTML = `
        ${productName} - Validade: ${expiryDate}
        <div class="actions">
            <button class="edit">Editar</button>
            <button class="delete">Excluir</button>
        </div>
    `;
    
    // Adicionar evento para o botão de excluir
    listItem.querySelector('.delete').addEventListener('click', function() {
        productList.removeChild(listItem);
    });
    
    // Adicionar evento para o botão de editar
    listItem.querySelector('.edit').addEventListener('click', function() {
        document.getElementById('productName').value = productName;
        document.getElementById('expiryDate').value = expiryDate;
        productList.removeChild(listItem);
    });
    
    productList.appendChild(listItem);
}
