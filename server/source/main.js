import scrollStream from "./lib/scrollStream";
import streamLink from "./services/stream";
import streamTorrent from "./services/torrent";

const testLink = `https://0az5rz5phwrbfthozhsp.vs7000.pics/dl/e7d8b8a193c6dc20uiMCP6sT6xw7u%7CGWs.emHZtisLxFlAE2Qs45g3fw__.N2IzYWJXRmRqMjRHWWxiZDk0Qlo0MUcxemJ0MTNjOXh2ZnJYdENjUmJMaVFrendLMTgwRG8zVGJ5dG9lUzVVYWxRdjJNbFVyZHZPUUVMbnBzUHdQTmlvSzVOSk1FRUZKOXZnd3NJRVY2blhQcXVWQ3NUQmo3U3p2SFZ5K2FzZlJBcXdZZGMwcmo4ZUQ0bFovQlIzN1ZZa2ZSNVVwTDcrSDdIWGI3NTNhRHdTV0pISHR5c3ZHa3habHdBczJ0bHo0aWxzRVc0TW9VejlrcG1UM01JN2tLejFWMVNldzY0dkU0MjhMRXNDV2lzT0QyK1BJV08xU0RNeUlxdUdMaFh4WTcvNUhINWY4SXZvcURhQTVjemNYc1FWL2YvY1dVQ3ZCK0syVlZ1VmtZK0JCNldHTjUzUWxZb1pIK1FSaUxYbFZsR3JrR0lKMXRCemVrWWpCK042Q3FDWFFNMFBlcTIvZEw5bHg5RTRoSHNYZWxzbGZsQ2UrRUIwaUFLTE9xbTNPZWFRL1IrRE1wK0tJdEFwSEQ2OEhGQVR0L3FxUmFBTDJ3RjUyRU1VSmQ2bCs3UjZwOVZqK3NVV3U5SndzRU9RSkdaRkNLKzlPb2xYMFdJdzUxV3UzdEFZT08xcUZoUi9xMmE3UXFjL1hYZz09`
// const testLink = `'https://react-redux.js.org/using-react-redux/usage-with-typescript'`

const magnetLink = `magnet:?xt=urn:btih:ECC20BB56A8DB6826430824BC0C539C9C2D49B6F&dn=Thor.Love.and.Thunder.2022.1080p.WEBRip.DDP5.1.Atmos.x264-CM&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2940%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2820%2Fannounce&tr=udp%3A%2F%2Ftracker.fatkhoala.org%3A13740%2Fannounce&tr=udp%3A%2F%2Ftracker.thinelephant.org%3A12770%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce`

async function main() {
    // for await (const data of streamLink(testLink)) {
    //     console.log('recieved chunk data', data)
    // }

    const service = await streamTorrent(magnetLink)
    console.log(service)

    const stream = service.getReadStream('Thor.Love.and.Thunder.2022.1080p.WEB-DL.DDP5.1.Atmos.H.264-CM.mkv')
    await scrollStream(stream)

    service.cleanUp()
}

main().catch(console.log)