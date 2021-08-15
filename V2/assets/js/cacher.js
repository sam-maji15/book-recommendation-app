export default function doNothing() {}

// encodes an object to Base64
function encodeToBase64(obj) {
  return btoa(JSON.stringify(obj))
}

// decodes an object from base64
function decodeFromBase64(str) {
  return JSON.parse(atob(str))
}


// simple caching (caching everything )
function cacheData(key, obj) {
  let str = btoa(JSON.stringify(obj))
  if (localStorage.getItem(key) === str) return
  else localStorage.setItem(key, str)
}


// caching using intersection observer 


export {
  encodeToBase64, decodeFromBase64, cacheData
}