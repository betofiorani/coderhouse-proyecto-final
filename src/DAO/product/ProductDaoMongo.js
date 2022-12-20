import BaseRepository from "../baseRepository/BaseRepository.js";
import Producto from "../../model/Producto.js";

let instance

class ProductDaoMongo extends BaseRepository {
  
    constructor() {
        super( Producto )
    }

    static getInstance() {
      if (!instance) {
        instance = new ProductDaoMongo();
      }
      return instance;
    }
}

export default ProductDaoMongo