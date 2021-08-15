import { encodeToBase64 } from './cacher.js'

export default function doNothing() {}

function createSearchResultElement(parent, prop, meta) {
  const container = document.createElement("DIV")
  const title = document.createElement("A")
  const author = document.createElement("P")
  const img = document.createElement("IMG")
  img.src = prop.smallImg
  img.className = 'img_preview'
  
  author.innerText = `By ${prop.author}`
  
  title.innerText = prop.titleFull
  title.href = `./BookMaster.html?q=isbn:${prop.isbn}&meta=${encodeToBase64(prop)}`
  
  
  container.appendChild(img)
  container.appendChild(author)
  container.appendChild(title)
  
  parent.appendChild(container)
}

export {
  createSearchResultElement,
}