const img_bookThumb = document.getElementById('img-book-thumb')
const h2_bookTitle = document.getElementById('h2-book-title')
const h2_bookSubtitle = document.getElementById('h2-book-subtitle')
const p_bookDesc = document.getElementById('p-book-desc')

const li_bookPageCount = document.getElementById('li-book-page-count')
const li_bookAuthors = document.getElementById('li-book-authors')
const li_bookPublishDate = document.getElementById('li-book-publish-date')

function getBooksData(query) {
  let link = `https://www.googleapis.com/books/v1/volumes?q=${query}`
  fetch(link)
  .then(response => {
    if (response.ok) return response.json()
    else throw new Error(`404 - Book by the name ${query} is not found`)
  })
  .then(data => {
    data = data.items[0].volumeInfo
    let minData = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      authors: data.authors.toString(),
      pageCount: data.pageCount,
      publisher: data.publisher,
      publishDate: data.publishedDate,
      thumbnail: data.imageLinks.thumbnail
    }
    return minData
  })
  .then(minData => {
    h2_bookTitle.innerHTML = minData.title
    h2_bookSubtitle.innerHTML = minData.subtitle
    p_bookDesc.innerHTML = minData.description
    img_bookThumb.src = minData.thumbnail
    li_bookPageCount.innerText = `${minData.pageCount} pages`
    li_bookAuthors.innerText = `Written by ${minData.authors}`
    li_bookPublishDate.innerText = `Published on ${minData.publishDate}`
  })
}


function getBooksDataById(query) {
  const link = `https://www.googleapis.com/books/v1/volumes/${query}`
  fetch(link)
    .then(response => {
      if (response.ok) return response.json()
      else throw new Error(`404 - Book by the name ${query} is not found`)
    })
    .then(data => {
      data = data.volumeInfo
      let minData = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        authors: data.authors.toString(),
        pageCount: data.pageCount,
        publisher: data.publisher,
        publishDate: data.publishedDate,
        thumbnail: data.imageLinks.thumbnail
      }
      return minData
    })
    .then(minData => {
      h2_bookTitle.innerHTML = minData.title
      h2_bookSubtitle.innerHTML = minData.subtitle
      p_bookDesc.innerHTML = minData.description
      img_bookThumb.src = minData.thumbnail
      li_bookPageCount.innerText = `${minData.pageCount} pages`
      li_bookAuthors.innerText = `Written by ${minData.authors}`
      li_bookPublishDate.innerText = `Published on ${minData.publishDate}`
    })
}

const btn_search = document.getElementById('btn-search')
const inp_search = document.getElementById('inp-search')
let search_query = (window.location.search === '') ? '' : window.location.search.replace('?q=', '')

if (search_query !== '') {
  // cache query
  localStorage.setItem('last-search', search_query)
}

search_query = (typeof localStorage.getItem('last-search') === 'null')? '' : localStorage.getItem('last-search')

getBooksData(search_query)

btn_search.onclick = () => {
  openLink(`./index.html?q=${inp_search.value}`)
}

const a_fake = document.getElementById('a-fake')
// opens a link on the same browser, on then same tab (same tab group for chrome)
function openLink(link) {
  a_fake.href = link
  a_fake.click()
}