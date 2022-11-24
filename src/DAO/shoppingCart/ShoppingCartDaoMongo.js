import MongoContainer from "../../container/ContainerMongo.js";
import ShoppingCart from "../../model/shoppingCart.js";

class ShoppingCartDaoMongo extends MongoContainer {
    constructor() {
        super( ShoppingCart )
    }
    async deleteProductById(){
      
    }
}

export default ShoppingCartDaoMongo