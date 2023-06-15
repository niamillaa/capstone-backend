const { Client } = require('pg')
require('dotenv').config()

function newClient(){
	const client = new Client({
		user: process.env.DATABASE_USER,
		host: process.env.DATABASE_HOST,
		database: process.env.DATABASE_NAME,
		password: process.env.DATABASE_PASSWORD,
		port: process.env.DATABASE_PORT,
	})
	return client
}

module.exports = newClient;