import MongoContainer from "../../container/mongoContainer.js";
import Chat from "../../model/chat.js";

class ChatDaoMongo extends MongoContainer {
    constructor() {
        super( Chat )
    }
}

export default ChatDaoMongo