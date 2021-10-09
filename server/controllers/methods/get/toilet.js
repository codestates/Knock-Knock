const XLSX = require("xlsx");

module.exports = async (req, res) => {
  let exel = XLSX.readFile(__dirname + "/../../../sample_data/toilets_seoul.xlsx")
  let data = exel.Sheets["Sheet0"]
  res.status(200).send(data)
}