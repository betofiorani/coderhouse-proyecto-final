import { environment } from "../environment/environment";
import twilio from "twilio";

const smsClient = twilio(environment.ACCOUNTSID, environment.AUTHTOKEN_TWILIO)

const smsOptions = {
    body: "",
    from: environment.ADMIN_SMS_NUMBER,
    to: "+54"
}

export { smsClient, smsOptions }