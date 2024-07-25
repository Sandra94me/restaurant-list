const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

const restaurants =require('./public/jsons/restaurant.json').results

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants',(req, res)=>{
  const keywords = req.query.keyword
  const MatchedItem = keywords?restaurants.filter((item) => 
    Object.values(item).some((property)=>{
      if(typeof property ==='string'){
        return property.toLowerCase().includes(keywords.toLowerCase())
      }
      return false
    })
  ):restaurants
  // console.log(MatchedItem)
  //印出所有物件底下的屬性與關鍵字相符，並回傳該物件
  res.render('index', { restaurants: MatchedItem , keywords })
})

app.get('/restaurant/:id',(req, res)=>{
  const id = req.params.id
  const restaurant = restaurants.find((item)=>item.id.toString()===id)
  res.render('detail',{restaurant})
})


app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})