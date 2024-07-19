const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/items')
})

app.get('/items',(req, res)=>{
  res.send('listing items')

})

app.get('/item/:id',(req, res)=>{
  const id = req.params.id
  res.send(`read item :${id}`)
})


app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})