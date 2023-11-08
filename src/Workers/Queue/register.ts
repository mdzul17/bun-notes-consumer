import { usersService } from "../../Services/UserServices"
import { MailSender } from "../../Utils/MailSender"

interface registerPayload {
    email: string,
    username: string,
    password: string,
    id: string,
    fullname: string
}

export const register = (body: registerPayload) => {
    try {
        const mailSender = new MailSender();
        console.log(body.email)

        mailSender.sendEmail(body.email, body)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}