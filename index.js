require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Client } = require('pg')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('*', (req, res) => {
  try {
    const client = new Client()
    client.connect()

    console.log(req.path)
    console.log(req.body.content)
    const c = req.body.content
    if (c === undefined) {
      // Remind user to RTFM
      res.end(
        'No content found in request body.  Read the docs.  https://github.com/entmike/hubitat-datacollector'
      )
      console.error(
        'No content found in request body.  Read the docs.  https://github.com/entmike/hubitat-datacollector'
      )
      client.end()
    } else {
      // Create INSERT statement
      const query = `
        INSERT INTO events (name, value, displayName, deviceId, descriptionText, unit, type, data)
        VALUES ('${c.name}','${c.value}','${c.displayName}','${c.deviceId}',
        '${c.descriptionText}','${c.unit}','${c.type}','${c.data}')`
      // Execute INSERT command
      client.query(query, (err, results) => {
        if (err) {
          console.error(`An error happened when trying to run:\n${query}`)
          console.error(err)
          res.json(err)
          client.end()
        } else {
          console.log(`Insert successful:\n${query}`)
          // console.log(results)
          res.json(req.body.content)
          client.end()
        }
      })
    }
  } catch (e) {
    console.error(`An unforeseen error ocurred.`)
    console.error(e)
    res.json(e)
  }
})

app.listen(3000, () =>
  console.log('Hubitat Data Collector app listening on port 3000!')
)
