const csvFilePath = 'customer-data.csv'
import fs from 'fs'
import csv from 'csvtojson'

const jsonLineAddAction = (state, arr) => {
  return [
    ...state,
    arr
  ]
}

const jsonLinesReducer = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    let jsonLinesState = []
    csv()
      .fromFile(csvFilePath)
      .on('json', (jsonObj) => {
        jsonLinesState = jsonLineAddAction(jsonLinesState, jsonObj)
      })
      .on('done', (error) => {
        if (error) reject(error)
        resolve(jsonLinesState)
      }
    )
  })
}

const jsonFileFromCSVFile = async (csvFilePath) => {
  try {
    fs.writeFile('customer-data.json', JSON.stringify((await jsonLinesReducer(csvFilePath)), null, 2), (error)=>{
      if (error) return process.exit(1)
      console.log('json file created')
      process.exit(0)
    })
  } catch(error) {
    console.log("error", error)
    process.exit(1);
  }
}

jsonFileFromCSVFile(csvFilePath)