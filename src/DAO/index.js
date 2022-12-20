import ProductDaoMongo from "./product/ProductDaoMongo.js"
import ShoppingCartDaoMongo from "./shoppingCart/ShoppingCartDaoMongo.js"
import ChatDaoMongo from "./chat/ChatDaoMongo.js"

const ProductDao = new ProductDaoMongo()
const ShoppingCartDao = new ShoppingCartDaoMongo()
const ChatDao = new ChatDaoMongo ()
        
export default { ProductDao, ShoppingCartDao, ChatDao }