import BaseRepository from "../baseRepository/BaseRepository.js";
import ShoppingCart from "../../model/shoppingCart.js";

let instance

class ShoppingCartDaoMongo extends BaseRepository {
    constructor() {
        super( ShoppingCart )
    }
    async deleteProductById(){
      
    }

    static getInstance() {
      if (!instance) {
        instance = new ShoppingCartDaoMongo();
      }
      return instance;
    }
}

export default ShoppingCartDaoMongo