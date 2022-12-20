import BaseRepository from "../baseRepository/BaseRepository.js";
import Chat from "../../model/Chat.js";

let instance

class ChatDaoMongo extends BaseRepository {
    constructor() {
        super( Chat )
    }
    
    static getInstance() {
      if (!instance) {
        instance = new ChatDaoMongo();
      }
      return instance;
    }
}

export default ChatDaoMongo