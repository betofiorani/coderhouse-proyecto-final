import MongoContainer from "../../container/mongoContainer.js";
import Producto from "../../model/Producto.js";

class ProductDaoMongo extends MongoContainer {
    constructor() {
        super( Producto )
    }
}

export default ProductDaoMongo