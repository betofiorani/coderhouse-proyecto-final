import admin from "firebase-admin";
import config from "../database/config.js"; 

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();
console.log("Conectado a Firebase")

class FirebaseContainer {
  constructor(nombreCollection) {
    this.collection = db.collection(nombreCollection);
  }

  async getById(id) {
    const doc = await this.collection.doc(id).get();
    const data = doc.data();

    return [data];
  }

  async getAll(){
    const doc = await this.collection.get()
    const productsDoc = doc.docs

    const documents = productsDoc.map( product => ({
      _id: product.id,
      ...product.data()
    }))
    return documents
  }

  async create(document){
    const newDoc = this.collection.doc()
    await newDoc.create(document)

    return document
  }

  async updateById(id, paramsToUpdate){
    
    await this.collection.doc(id).update(paramsToUpdate)    
    return {...paramsToUpdate, _id: id}
  }

  async deleteById(id){
    try {
      const docToDelete = this.collection.doc(id)
      await docToDelete.delete()
      return {status: 'ok', message: "Registro eliminado exitosamente"}
    } catch (error) {
      console.log(error)
    }
  }
  
}

export default FirebaseContainer