var express = require('express');
var router = express.Router();

const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require('../service-account.json')

const SPREADSHEET_ID = '1f-1Ke5hfKWP-s602L-aBSFdGaiIx0ylZvF86Z5TAby0'

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  await promisify(doc.useServiceAccountAuth)(credentials)
  const info = await promisify(doc.getInfo)()
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email)
  const sheet = info.worksheets[0]
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  )
  const cells = await promisify(sheet.getCells)()
  for (const cell of cells) {
    console.log(`${cell.row},${cell.col}: ${cell.value}`)
  }
  return cells;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Watch Later', cells: cells[0] });
});

module.exports = router;
