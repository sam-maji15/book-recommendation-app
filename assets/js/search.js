import AsyncFetch from './async_fetch.js'

let searchData = []
let pageStartIndex = 0;
let itemsLeft = 0;

let search_query = (window.location.search === '') ? '' : window.location.search.replace('?q=', '')

const inp_search = document.getElementById('inp-search')
const btn_search = document.getElementById('btn-search')
const btn_loadMore = document.getElementById('btn-load-more')
const a_fake = document.getElementById('a-fake')

let asyncFetch = new AsyncFetch()




//IntersectionObserver
const io_options = {
  root: null,
  rootMargins: '0px',
  threshold: '0.5'
}

const io = new IntersectionObserver(io_callback, io_options)

io.observe(document.getElementById('btn-load-more'))

function io_callback(entries, observer) {
if (entries[0].isIntersecting && pageStartIndex<=20 && typeof search_query !== undefined) {
    asyncFetch.getBookSearchResults('?q='+search_query, pageStartIndex)
    pageStartIndex += 10
  }
else if(pageStartIndex>20) {
  io.disconnect()
  btn_loadMore.innerText = `More ${asyncFetch.getSearchResultsNotDisplayedCount(pageStartIndex)} results`
}

btn_search.onclick = () => {
  pageStartIndex = 0
  document.getElementById('con-search-results').innerHTML = ''
  search_query = '?q='+inp_search.value
  console.log(search_query)
  asyncFetch.getBookSearchResults(search_query, pageStartIndex)
}
}


btn_loadMore.onclick = () => {
  pageStartIndex += 20
  asyncFetch.getBookSearchResults(search_query, pageStartIndex)
}