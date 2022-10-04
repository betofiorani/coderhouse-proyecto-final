import FirebaseContainer from "../../container/firebaseContainer.js";


class ShoppingCartFirebase extends FirebaseContainer {
  constructor() {
    super("ShoppingCart");
  }
  async create(document){
    const newDoc = this.collection.doc()
    await newDoc.create({productos: []})

    return {_id: newDoc.id }
  }
}

export default ShoppingCartFirebase;