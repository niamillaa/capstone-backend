const { Client } = require('pg')
require('dotenv').config()

function newClient(){
	const client = new Client({
		user: process.env.USER,
		host: process.env.HOST,
		database: process.env.DATABASE,
		password: process.env.PASSWORD,
		port: process.env.PORT_DATABASE,
	})
	return client
}

module.exports = newClient;