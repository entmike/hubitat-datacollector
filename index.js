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
  try {
    console.log(req.path)
    console.log(req.body.content)
    const c = req.body.content
    if (c === undefined)
      res.end(
        'No content found in request body.  Read the docs.  https://github.com/entmike/hubitat-datacollector'
      )
    const query = `
          INSERT INTO events (name, value, displayName, deviceId, descriptionText, unit, type, data)
          VALUES ('${c.name}','${c.value}','${c.displayName}','${c.deviceId}',
          '${c.descriptionText}','${c.unit}','${c.type}','${c.data}')`

    client.query(query, (err, results) => {
      if (err) {
        console.error(err)
        res.json(err)
      } else {
        console.log(`Insert successful:\n${query}`)
        res.json(req.body.content)
      }
    })
  } catch (e) {
    res.json(e)
  }
})

app.listen(3000, () =>
  console.log('Hubitat Data Collector app listening on port 3000!')
)
