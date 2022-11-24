import MongoContainer from "../../container/ContainerMongo.js";
import Producto from "../../model/Producto.js";

class ProductDaoMongo extends MongoContainer {
    constructor() {
        super( Producto )
    }
}

export default ProductDaoMongo