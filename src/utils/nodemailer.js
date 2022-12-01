import { environment } from "../environment/environment.js";
import { createTransport } from "nodemailer";

const transporter = createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: environment.NODEMAILER_MAIL,
        pass: environment.NODEMAILER_PASS
    }
})

const mailOptions = {
    from: "Server Node.js",
    to: environment.ADMIN_MAIL,
    subject: "New user registed! :)",
    html: ""
}


export { transporter, mailOptions }