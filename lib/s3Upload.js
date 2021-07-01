require('dotenv').config()

const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const mime = require('mime')
const filePath = './sample-image.jpeg'
const mimeType = (mime.getType(filePath))

console.log(mimeType)

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  const params = {
    ACL: 'public-read',
    Bucket: process.env.BUCKET_NAME,
    Key: Math.random().toString().split('.')[1],
    // crypto.randomBytes(8).toString('hex') *requires crypto*
    ContentType: mimeType,
    Body: data
  }

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
})
