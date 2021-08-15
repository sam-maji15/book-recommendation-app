import fetchBookDetails from './async_fetch.js'


// detecting search query
let searchQuery = window.location.search || ""

if (searchQuery !== "") {
  searchQuery.replace(" ", "+")
  fetchBookDetails(searchQuery)
}