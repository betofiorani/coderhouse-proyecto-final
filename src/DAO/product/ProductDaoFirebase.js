import FirebaseContainer from "../../container/firebaseContainer.js";


class ProductDaoFirebase extends FirebaseContainer {
  constructor() {
    super("Producto");
  }
  async create(document){
    const docToUpdate = await this.collection.doc(document.code).get()
    
    if(!docToUpdate.data()){
      
      document._id = document.code

      await this.collection.doc(document.code).create(document)
      return document
    }
      else {
        return { message: `The product code ${document.code} already exist in database` }
      }
  }
}

export default ProductDaoFirebase;