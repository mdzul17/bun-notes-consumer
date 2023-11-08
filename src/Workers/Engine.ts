import amqp from "amqplib"
import { register } from "./Queue/register"

export class Engine {
    runningWorker: number
    taskQueue: string[]

    constructor() {
        this.runningWorker = 0
        this.taskQueue = []
    }

    async start() {
        let connection = await amqp.connect(process.env.RABBITMQ_SERVER)
        let channel = await connection.createChannel()

        await channel.assertQueue("auth:register")
        channel.prefetch(parseInt(process.env.MAX_MESSAGES))

        channel.consume("auth:register", async (message: any) => {
            const content = JSON.parse(message.content.toString())

            const startProcess = (payload: any) => {
                register(payload)
            }

            try {
                if (this.runningWorker < parseInt(process.env.MAX_MESSAGES)) {
                    this.runningWorker++
                    startProcess(content);
                    console.log("Queue has been succesfully executed!")
                } else {
                    this.taskQueue.push(content)
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.runningWorker--
                if (this.taskQueue.length > 0) {
                    let nextTask = this.taskQueue.shift()
                    startProcess(nextTask)
                }
            }
        }, { noAck: true })
    }
}