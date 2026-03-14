const express = require("express")
const app = express()

const productsRouter = require("./routes/products")

app.use(express.static("public"))
app.use(express.json())
app.use("/products",productsRouter)

app.listen(3000,()=>{
    console.log("server running on port 3000")
})