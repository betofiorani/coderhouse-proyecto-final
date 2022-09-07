import fs from "fs"

const path = "./archivos/"

class Producto {
  constructor(fileName){
    this.fileName = fileName
  }
  save = async req => {

    const productData = req.body

    console.log("aca llega", req.body)

    try{

        const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
        let maxId = 0

        products.forEach(product => {
          maxId = product.id
          maxId > product.id ? maxId = product.id : "" 
        })

        const id = maxId + 1
        const timestamp = new Date()
        
        const newProduct = {...productData, id, timestamp }

        products.push(newProduct)
        
        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(products, null, "\t"))
        
        return newProduct
        
    } 
    catch(error) {
        console.log(`Ocurrió un error al guardar el producto. El error es: ${error}`)
    }
  } 
  getById = async req => {

    const {id} = req.params

    try{
      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []        
      const productFiltered = products.filter(product => product.id == id)
      
      return productFiltered.length > 0 ? productFiltered : {error: `Producto con id ${id} no encontrado`}
    }
    catch (error){
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  getRamdomProduct = async () => {

    try{
      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
      const idAleatorio = Math.floor(Math.random()*(products.length))
      return products.length > 0 ? products[idAleatorio] : "No se encontró ningún producto"
      
    }
    catch (error){
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  getAll = async () => {

    try {      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
      return products
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  deleteById = async req => {

    const {id} = req.params

    try {
      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
      const filterProducts = products.filter(product => product.id != id)
      
      await fs.promises.unlink(`${path}${this.fileName}`)
      await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterProducts, null, "\t"))
      
      return {status: 'ok', message: `El producto con id: ${id} fue eliminado correctamente`}
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  deleteAll = async () => {
    try {

      const products = []

      await fs.promises.unlink(`${path}${this.fileName}`)
      await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(products, null, "\t"))
      
      return "Todos los productos se eliminaron correctamente"
    } 
    catch (error) {
        console.log(`Ocurrió un error al eliminar el archivo. El error fue: ${error}`)
    }
  }

  modifyById = async req =>{

    const {id} = req.params
    const newData = req.body
    
    try {
        
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
        const filterProducts = products.map(product => product.id == id ? {...newData, id: product.id} : product)
        const productUpdated = filterProducts.filter(product => product.id == id)

        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterProducts, null, "\t"))

        console.log("Productos Disponibles luego de la modificación: ",filterProducts)

        return productUpdated
        
      } catch (error) {
          console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
      }
  }
}

export default Producto