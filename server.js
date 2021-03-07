const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
require("dotenv").config()
const { PORT } = process.env || 3001
app.use(express.json())
app.use(express.static("public"))

app.listen(PORT, () => {
	console.log(`STARTED PORT ${PORT}`)
})

const quizController = require("./controllers/quiz_controller.js")
app.use("/quiz", quizController)

//connect Mongo
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
// Error / success
mongoose.connection.on("error", err =>
	console.log(
		err.message,
		" is Mongod not running?/Problem with Atlas Connection?"
	)
)
mongoose.connection.on("connected", () => console.log("STARTED MONGODB"))
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"))
