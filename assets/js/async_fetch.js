import customElements from './custom_elements.js'

export default class AsyncFetch {
  constructor() {
    this.searchResultsNotDisplayedCount = 0
    this.customElements = new customElements()
  }
  
  getSearchResultsNotDisplayedCount(pageStartIndex) {
    return this.searchResultsNotDisplayedCount - pageStartIndex
  }
  
  /* returns search results from query */
  async getBookSearchResults(query, pageStartIndex) {
  if (query.replace('?q=', '') === '') return
  
  // link for loading 9 items at a time
  const link = `https://www.googleapis.com/books/v1/volumes${query}&startIndex=${pageStartIndex}&maxResults=${10}`

  let response = await fetch(link)
  
  if (!response.ok) {
    throw new Error(response.status)
  }
  
  // got a response
  if (response.ok) {
    let data = await response.json()
    this.searchResultsNotDisplayedCount = data.totalItems
    
    let newItems = []
    newItems = data.items.map(
      item => {
        return {
          title: item.volumeInfo.title,
          subtitle: item.volumeInfo.subtitle,
          imageLinks: item.volumeInfo.imageLinks,
          authors: (typeof item.volumeInfo.authors !== 'undefined') ? item.volumeInfo.authors.toString() : '',
        }
      })
      
      newItems.forEach((item, index) => {
        this.customElements.createBookSearchResultElement(item, '#')
      })
      
      // items left
      //itemsLeft = data.totalItems
  }
  console.log(pageStartIndex)
}}