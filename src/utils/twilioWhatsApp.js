import { environment } from "../environment/environment";
import twilio from "twilio";

const whatsappClient = twilio(environment.ACCOUNTSID, environment.AUTHTOKEN_TWILIO)

const whatsappOptions = {
    body: "",
    from: `whatsapp:${environment.TWILIO_WHATSAPP_SANDBOX}`,
    to: `whatsapp:${environment.ADMIN_WHATSAPP_NUMBER}`
}

export { whatsappClient, whatsappOptions }