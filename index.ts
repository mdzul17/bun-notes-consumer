import { Engine } from "./src/Workers/Engine"

const engine = new Engine()
engine.start()
console.log(`Waiting for new messages`)