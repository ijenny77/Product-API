const express = require("express")
const router = express.Router()

let products = [
    {id:1,name:"Phone",price:"3M"},
    {id:2,name:"Laptop",price:"50M"},
    {id:3,name:"Car",price:"900M"}
]

router.use((req,res,next)=>{
    console.log("Products route accessed")
    next()
})

router.param("id",(req,res,next,id)=>{
    console.log("Product ID:",id)
    next()
})
router.get("/",(req,res)=>{
    res.json(products)
})

router.get("/:id",(req,res)=>{
    const product = products.find(p=>p.id == req.params.id)
    res.json(product)
})

router.post("/",(req,res)=>{
    const newProduct = {
        id:products.length + 1,
        name:req.body.name,
        price:req.body.price
    }
    products.push(newProduct)
    res.json(newProduct)
})

router.put("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id)

  if (!product) {
    return res.send("Product not found")
  }

  product.name = req.body.name
  product.price = req.body.price

  res.json(product)
})
router.delete("/:id",(req,res)=>{
    const index = products.findIndex(p => p.id == req.params.id)

    if(index === -1){
        return res.send("Product not found")
    }

    products.splice(index,1)
    res.send("Product deleted")
})

module.exports = router