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

btn_search.onclick = () => {
  getBooksData(inp_search.value.trim().replace(' ', '+'))
}
getBooksData(window.location.search.replace('?q=', ''))
//btn_search.click()


fetch('https://www.googleapis.com/books/v1/volumes?q=hooked')
.then(res => {
  return res.json()
})
.then(data => {
  data.items.map(item => {
    console.table(item.volumeInfo)
  })
})