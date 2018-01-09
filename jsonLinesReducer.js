import csv from 'csvtojson'

const jsonLineAddAction = (state, jsonObj) => [...state, jsonObj]

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

export default jsonLinesReducer