import MongoContainer from "../../container/ContainerMongo.js";
import Chat from "../../model/Chat.js";

class ChatDaoMongo extends MongoContainer {
    constructor() {
        super( Chat )
    }
}

export default ChatDaoMongo