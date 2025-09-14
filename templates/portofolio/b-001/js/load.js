const productList = document.getElementById("productList");

function loadDataProduct() {
    productList.innerHTML = "";

    dataProduct.forEach(product => {
        const code = `
        <div class="card item">
            <img src="${product.image}" alt="">
            <h3 class="heading">${product.name}</h3>
            <h5 class="heading">${product.price}</h5>
            <p class="description">${product.description}</p>
            <button class="linkButton hover-spin-x">Check Product</button>
        </div>`;
        
        productList.innerHTML += code;
    });
}

loadDataProduct()