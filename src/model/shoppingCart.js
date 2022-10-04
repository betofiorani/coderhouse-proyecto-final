import mongoose from "mongoose";

const shoppingCartSchema = mongoose.Schema({
  productos: [
    { 
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
      quantity: { type: Number, default: 1 }
    }
  ]
},{
  timestamps: true
})

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema)

export default ShoppingCart