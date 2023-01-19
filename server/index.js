const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors())

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// searching on query

app.post('/searchmetaphorsource', async (req, res) => {
  const { metaphorSrcSearch } = require('./SearchEngine');
  const data = await metaphorSrcSearch(req.body.query);
  res.json(data);
})

// app.post('/srcsearchmetaphorwithtype', async (req, res) => {
//   const { SrcmetaphorSearchWithType } = require('./SearchEngine');
//   const data = await SrcmetaphorSearchWithType(req.body.query,req.body.type);
//   res.json(data);
// })

app.post('/searchmetaphortarget', async (req, res) => {
  const { metaphorTgetSearch } = require('./SearchEngine');
  const data = await metaphorTgetSearch(req.body.query);
  res.json(data);
})

app.post('/tgtsearchmetaphorwithtype', async (req, res) => {
  const { TgtmetaphorSearchWithType } = require('./SearchEngine');
  const data = await TgtmetaphorSearchWithType(req.body.query,req.body.type);
  res.json(data);
})

app.post('/withpartialsrc', async (req, res) => {
  const { withPartialSrc } = require('./SearchEngine');
  const data = await withPartialSrc(req.body.query);
  res.json(data);
})

app.post('/wuthpartialtget', async (req, res) => {
  const { withPartialTget } = require('./SearchEngine');
  const data = await withPartialTget(req.body.query);
  res.json(data);
})

app.post('/searchbyother', async (req, res) => {
  const { searchByOtherFileds } = require('./SearchEngine');
  const data = await searchByOtherFileds(req.body.field, req.body.query);
  res.json(data);
})

app.listen(3001, () => console.log('server running at 3001'));