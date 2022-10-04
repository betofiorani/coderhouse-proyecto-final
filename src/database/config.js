import { environment } from "../environment/environment.js"
import { getFirebaseSecretKey } from "../utils/functions.js";

const firebase = await getFirebaseSecretKey(`${environment.FIREBASE_SECRET_KEY}`)

export default {
  mongodb: {
      connectionString : environment.MONGO_STRING_CONNECTION
  },
  firebase: firebase
}