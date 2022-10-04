import { environment } from "../environment/environment.js"

let ProductDao
let ShoppingCartDao
let ChatDao

switch (environment.DATABASE) {
    case "firebase":
        const { default: ProductDaoFirebase } = await import(
            "./product/ProductDaoFirebase.js"
        )
        const { default: ShoppingCartDaoFirebase } = await import(
            "./shoppingCart/ShoppingCartDaoFirebase.js"
        )
        const { default: ChatDaoFirebase } = await import(
          "./chat/ChatDaoFirebase.js"
        )

        ProductDao = new ProductDaoFirebase()
        ShoppingCartDao = new ShoppingCartDaoFirebase()
        ChatDao = new ChatDaoFirebase()

        break;

    case "mongodb":
        const { default: ProductDaoMongo } = await import(
            "./product/productDaoMongo.js"
        )
        const { default: ShoppingCartDaoMongo } = await import(
            "./shoppingCart/ShoppingCartDaoMongo.js"
        )
        const { default: ChatDaoMongo } = await import(
          "./chat/ChatDaoMongo.js"
        )

        ProductDao = new ProductDaoMongo()
        ShoppingCartDao = new ShoppingCartDaoMongo()
        ChatDao = new ChatDaoMongo ()
        
        break;
    case "fileSystem":
        const { default: ProductDaoFileSystem } = await import(
            "./product/productDaoFileSystem.js"
        )
        const { default: ShoppingCartDaoFileSystem } = await import(
            "./shoppingCart/ShoppingCartDaoFileSystem.js"
        )
        const { default: ChatDaoFileSystem } = await import(
          "./chat/ChatDaoFileSystem.js"
        )

        ProductDao = new ProductDaoFileSystem()
        ShoppingCartDao = new ShoppingCartDaoFileSystem()
        ChatDao = new ChatDaoFileSystem()
        
        break
}

export default { ProductDao, ShoppingCartDao, ChatDao }