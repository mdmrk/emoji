import path from 'path'
import express from 'express'
import fs from 'fs'
import stream from 'stream'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const publicDir = path.join(__dirname, 'public')
const emojiDir = path.join(publicDir, 'emoji')
const serverIP = process.env.SERVER_IP || 'localhost'
const serverPort = process.env.SERVER_PORT || 3000

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.static(publicDir))
const router = express.Router()

router.get('/:unicode', async (req, res) => {
  try {
    if (!req.params.unicode || typeof req.params.unicode !== 'string') throw 'error'
    const filename = path.join(emojiDir, `0x${req.params.unicode}.png`)
    const s = fs.createReadStream(filename)
    const ps = new stream.PassThrough()

    stream.pipeline(s, ps, (err) => {
      if (err) {
        return res.status(500).json(err)
      }
    })
    ps.pipe(res)
  } catch (err) {
    return res.status(500).json({
      err
    })
  }
})

app.use('/', router)
app.listen(serverPort, function () {
  console.log(`listening on http://${serverIP}:${serverPort}/`)
})
