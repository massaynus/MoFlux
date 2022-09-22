import { request } from 'https'
import { STREAM_SERVICE_DELAY } from '../lib/config'

// This implementation is meant to enable pausing and resuming the download
export default async function* streamLink(url) {
    const promisesQueue = []
    const enders = new Set(['end', 'error'])

    request(url, (res) => {

        const headers = res.headers
        let counter = 0
        let dataLength = 0

        res.on('data', function (chunk) {
            counter++
            dataLength += chunk.length

            const data = {
                type: 'chunk',
                STREAM_SERVICE_DELAY,
                timestamp: Date.now(),
                counter,
                headers,
                chunkLength: chunk.length,
                chunk,
                pause: res.pause,
                resume: res.resume,
            }

            promisesQueue.push(data)
        })

        res.on('end', () => {
            promisesQueue.push({ type: 'end', counter, dataLength, timestamp: Date.now() })
        })

        res.on('error', (error) => {
            promisesQueue.push({ type: 'error', error, timestamp: Date.now() })
        })

    }).end()

    while (true) {
        if (!promisesQueue.length) {
            await new Promise(res => setTimeout(res, STREAM_SERVICE_DELAY))
            continue
        }

        const result = promisesQueue.shift()
        yield result

        if (enders.has(result.type))
            break
    }
}