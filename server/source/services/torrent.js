import torrentStrem from 'torrent-stream'

export default async function streamTorrent(magnetLink) {
    const engine = torrentStrem(magnetLink)
    console.log('created engine')

    // Wait for the engine to be ready
    await new Promise(res => engine.on('ready', res))
    console.log('engine ready')

    // Helpers
    const fileNames = new Set(engine.files.map(f => f.name))
    const resultOrDefault = (name, result, defaultResult = null) => fileNames.has(name) ? result : defaultResult

    // Return all the needed operations
    return {
        files: Array.from(fileNames),
        select: name => resultOrDefault(
            name,
            engine.files.find(f => f.name === name).select(),
        ),
        deselect: name => resultOrDefault(
            name,
            engine.files.find(f => f.name === name).deselect(),
        ),
        getReadStream: name => resultOrDefault(
            name,
            engine.files.find(f => f.name === name).createReadStream(),
        ),
        cleanUp: engine.destroy
    }
}