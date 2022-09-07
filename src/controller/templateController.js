import path from 'path';

const getTemplate = async (req, res, next) => {
  
  const {template} = req.params
  try {
    
    res.sendFile(path.resolve(`src/views/${template}.ejs`));
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

export {getTemplate}