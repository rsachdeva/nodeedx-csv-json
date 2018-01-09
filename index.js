const csvFilePath = 'customer-data.csv'
import fs from 'fs'
import jsonLinesReducer from './jsonLinesReducer'

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