import express from "express"
import expressWebsockets from "express-ws"
import { Server } from "@hocuspocus/server"

// Configure hocuspocus
const server = Server.configure({
	// ...
})

// Setup your express instance using the express-ws extension
const { app } = expressWebsockets(express())

// Add a websocket route for hocuspocus
// Note: make sure to include a parameter for the document name.
// You can set any contextual data like in the onConnect hook
// and pass it to the handleConnection method.
app.ws("/:document", (websocket, request) => {
	console.log(request)

	const context = {
		user: {
			id: 1234,
			name: "Jane",
		},
	}

	server.handleConnection(
		websocket,
		request,
		request.params.document,
		context
	)
})

// Start the server
app.listen(1234, () => console.log("Listening on http://0.0.0.0:1234"))
