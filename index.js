require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Client } = require('pg')

const client = new Client()

client.connect()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('*', (req, res) => {
  console.log(req.path)
  console.log(req.body.content)
  const c = req.body.content

  const query = `
        INSERT INTO events (name, value, displayName, deviceId, descriptionText, unit, type, data)
        VALUES ('${c.name}','${c.value}','${c.displayName}','${c.deviceId}',
        '${c.descriptionText}','${c.unit}','${c.type}','${c.data}')`

  client.query(query, (err, results) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Insert successful.')
    res.json(req.body.content)
    // client.end();
  })
})

app.listen(3000, () => console.log('Gator app listening on port 3000!'))
