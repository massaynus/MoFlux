import streamLink from "./services/stream";

const testLink = `https://0az5rz5phwrbfthozhsp.vs7000.pics/dl/e7d8b8a193c6dc20uiMCP6sT6xw7u%7CGWs.emHZtisLxFlAE2Qs45g3fw__.N2IzYWJXRmRqMjRHWWxiZDk0Qlo0MUcxemJ0MTNjOXh2ZnJYdENjUmJMaVFrendLMTgwRG8zVGJ5dG9lUzVVYWxRdjJNbFVyZHZPUUVMbnBzUHdQTmlvSzVOSk1FRUZKOXZnd3NJRVY2blhQcXVWQ3NUQmo3U3p2SFZ5K2FzZlJBcXdZZGMwcmo4ZUQ0bFovQlIzN1ZZa2ZSNVVwTDcrSDdIWGI3NTNhRHdTV0pISHR5c3ZHa3habHdBczJ0bHo0aWxzRVc0TW9VejlrcG1UM01JN2tLejFWMVNldzY0dkU0MjhMRXNDV2lzT0QyK1BJV08xU0RNeUlxdUdMaFh4WTcvNUhINWY4SXZvcURhQTVjemNYc1FWL2YvY1dVQ3ZCK0syVlZ1VmtZK0JCNldHTjUzUWxZb1pIK1FSaUxYbFZsR3JrR0lKMXRCemVrWWpCK042Q3FDWFFNMFBlcTIvZEw5bHg5RTRoSHNYZWxzbGZsQ2UrRUIwaUFLTE9xbTNPZWFRL1IrRE1wK0tJdEFwSEQ2OEhGQVR0L3FxUmFBTDJ3RjUyRU1VSmQ2bCs3UjZwOVZqK3NVV3U5SndzRU9RSkdaRkNLKzlPb2xYMFdJdzUxV3UzdEFZT08xcUZoUi9xMmE3UXFjL1hYZz09`
// const testLink = `'https://react-redux.js.org/using-react-redux/usage-with-typescript'`

async function main() {
    // await streamLink('https://react-redux.js.org/using-react-redux/usage-with-typescript')

    for await (const data of streamLink(testLink)) {
        console.log('recieved chunk data', data)
    }
}

main().catch(console.log)