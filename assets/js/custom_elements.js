export default class CustomElements {
  constructor() {
    this.con_searchResults = document.getElementById('con-search-results')
  }
  
  createBookMasterSearchResult() {
    
  }
  
  createBookSearchResultElement(data, id) {
    const container = document.createElement('DIV')
    container.className = 'con-book-item'
    
    const image = document.createElement('IMG')
    const title = document.createElement('A')
    
    image.src = (typeof data.imageLinks !== 'undefined') ? data.imageLinks.smallThumbnail : '#'
    
    data.title = this.parseValue(data.title)
    data.subtitle = this.parseValue(data.subtitle)
    
    
    title.innerText = `${data.title} ${data.subtitle} ${data.authors}`
    title.href = `./index.html?q=${id}`
    container.appendChild(image)
    container.appendChild(title)
    this.con_searchResults.appendChild(container)
  }
  
  parseValue(str) {
    return (typeof str === 'string') ? ' ' + str + ' -' : ''
  }
}