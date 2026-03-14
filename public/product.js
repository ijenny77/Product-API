const API = "http://localhost:3000/products"
const list = document.getElementById("products")

// Load products
function loadProducts(){
  fetch(API)
  .then(res => res.json())
  .then(products => {
    list.innerHTML = products.map(p => `
      <li>
        ${p.name} - ${p.price}
        <button style="border:1px solid blue;border-radius:3px; background-color:blue;color:white" onclick="editProduct(${p.id},'${p.name}','${p.price}')">Edit</button>
        <button style="border:1px solid red; border-radius:3px; background-color:red;color:white" onclick="deleteProduct(${p.id})">Delete</button>
      </li>
    `).join("")
  })
}

// Add product
function addProduct(){
  const name = document.getElementById("name").value
  const price = document.getElementById("price").value

  fetch(API,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,price})
  }).then(loadProducts)
}

// Delete product
function deleteProduct(id){
  fetch(API+"/"+id,{method:"DELETE"})
  .then(loadProducts)
}

// Edit product
function editProduct(id,name,price){
  const newName = prompt("New name:",name)
  const newPrice = prompt("New price:",price)

  fetch(API+"/"+id,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name:newName,price:newPrice})
  }).then(loadProducts)
}

loadProducts()