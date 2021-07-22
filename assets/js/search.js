const api_key = 'GBQj6GfbatyInuhrwsRVPykwjiCAdaQl'

let search_query = (window.location.search.replace('?q=', '') === '') ? undefined: window.location.search.replace('?q=','')

if (typeof search_query !== 'undefined') getBookSearchData(search_query)

function getSearchResults(query) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
  .then(response => {
    if (response.ok) return response.json()
    else throw new Error('404 - page not found')
  })
  .then(data => {
    con_searchResults.innerHTML = ''
    data = data.items.map((item,index) => {
      createSearchElement(item.volumeInfo, data.items[index].id)
      return item.volumeInfo
    }) // data obj becomes an array
  })
}

const inp_search = document.getElementById('inp-search')
const btn_search = document.getElementById('btn-search')
btn_search.onclick = () => {
  search_query = inp_search.value.replace(' ', '+')
  getSearchResults(search_query)
}


const con_searchResults = document.getElementById('con-search-results')
function createSearchElement(data, id) {
  const container = document.createElement('DIV')
  container.className = 'con-book-item'
  
  const image = document.createElement('IMG')
  const title =  document.createElement('A')
  
  image.src = (typeof data.imageLinks !== 'undefined') ? data.imageLinks.smallThumbnail : '#'
  
  data.title = parseValue(data.title)
  data.subtitle = parseValue(data.subtitle)
  
  title.innerText = `${data.title} ${data.subtitle} ${data.authors.toString()}`
  title.href = `./index.html?q=${id}`
  container.appendChild(image)
  container.appendChild(title)
  con_searchResults.appendChild(container)
}

function parseValue(str) {
  return (typeof str === 'string') ? ' ' + str + ' -' : ''
}