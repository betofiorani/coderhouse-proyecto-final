import MongoContainer from "../../container/ContainerMongo.js";
import Chat from "../../model/chat.js";

class ChatDaoMongo extends MongoContainer {
    constructor() {
        super( Chat )
    }
}

export default ChatDaoMongo