import morgan from "morgan"
import express from "express"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"

export default app => {
	app.use(express.json())
	app.use(cors())

	if (process.env.NODE_ENV) {
		app.use(morgan("dev"))
	} else {
		app.use(compression())
		app.use(helmet())
		app.use(morgan("common"))
	}
}
