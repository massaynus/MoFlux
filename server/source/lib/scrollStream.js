export default async function (stream) {
    console.log('scrolling stream')

    await new Promise(res => stream.on('ready', res))

    stream.on('data', chunk => {
        console.log(chunk.length)
    })
}