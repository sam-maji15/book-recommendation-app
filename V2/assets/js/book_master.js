import { decodeFromBase64 } from './cacher.js'

// search patterns
const metaSelector = new RegExp(/\&[meta]*.*/)


let metaData = window.location.search.match(metaSelector).toString().replace('&meta=', '')

console.log(metaData)

//console.table(decodeFromBase64(metaData))