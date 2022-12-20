import mongoose from "mongoose";
import config from "../../database/config.js";

mongoose.connect(config.mongodb.connectionString)

class BaseRepository {
    constructor(model){
        this.collection = model
    }

    async getById(id) {
        const doc = await this.collection.find( { _id: id } )
        return doc
    }

    async getPopulateById(id, populate) {

        const doc = await this.collection.find( { _id: id } ).populate(populate)
        return doc
    }

    async getAll(){
        const docs = await this.collection.find()
        return docs
    }

    async create(document){

        const doc = await this.collection.insertMany(document)
        return doc[0]
    }

    async updateById(id, paramsToUpdate){
        await this.collection.updateOne({ _id: id }, {$set: paramsToUpdate})
        return {id, ...paramsToUpdate}
    }

    async deleteById(id){
        await this.collection.deleteOne({ _id: id })
        return {status: 'ok', message: "Registro eliminado exitosamente"}
    }
}

export default BaseRepository