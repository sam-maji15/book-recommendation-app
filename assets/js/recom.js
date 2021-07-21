const api_key= 'GBQj6GfbatyInuhrwsRVPykwjiCAdaQl'

// if search query is undefined the display categories else display books
const search_query = (window.location.search.replace('?q=', '') === '') ? undefined : window.location.search.replace('?q=', '')

// categories
const con_categories = document.getElementById('con-categories')

/* fetching all the available categories from categories.json */
if (typeof search_query !== 'string' ) {
  fetch('./categories.json')
    .then(res => res.json())
    .then(data => {
      categories_array = data.items.map(item => createCategoryItem(item.list_name, item.list_name_encoded))
    })
}

// all available categories
const allCategoryLink = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${api_key}`

console.log(allCategoryLink)

function getAllCategories() {
  fetch(allCategoryLink)
  .then(response => {
    if (response.ok) return response.json()
    else throw new Error('Can\'t find the file')
  })
  .then(data => {
    document.execCommand('')
    let myStr= ''
    data.results.map(item =>
      {
        myStr+=` {\"list_name\": \"${item.list_name}\", \n\"list_name_encoded\": \"${item.list_name_encoded}\"},\n`
      })
      console.log(myStr)
      const ele = document.createElement('P')
      ele.style.fontSize = '0.5rem'
      ele.innerText = myStr
      document.body.appendChild(ele)
      
  })
}

function copyToClipboard(text) {
  var input = document.body.appendChild(document.createElement("input"));
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('copy');
  input.parentNode.removeChild(input);
}

function createCategoryItem(text, text_encoded) {
  const title = document.createElement('A')
  title.innerText = text
  title.href = `recom.html?q=${text_encoded}`
  con_categories.appendChild(title)
}


if (typeof search_query === 'string') {
  con_categories.innerHTML = ''
  con_categories.innerText = search_query+'-recommendations'
  fetchRecommendation(search_query)
}

function fetchRecommendation(title_encoded) {
  fetch(`https://api.nytimes.com/svc/books/v3/lists.json?list-name=${title_encoded}&api-key=${api_key}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      let isbn = data.results.map(item => {
  
        let book_link = `https://www.googleapis.com/books/v1/volumes?q=isbn:${item.isbns[0].isbn13}`
  
        fetch(book_link)
          .then(response1 => response1.json())
          .then(data1 => {
          
          createRecommendationObject(data1.items[0].volumeInfo.imageLinks.thumbnail)
          })
      })
    })
}

const con_recom = document.getElementById('con-recom')

function createRecommendationObject(imgSrc) {
  const image = document.createElement('IMG')
  const con_image = document.createElement('DIV')
  con_image.className = 'con-recom-img'
  image.src = imgSrc
  con_image.appendChild(image)
  con_recom.appendChild(con_image)
}


/* searching a book */
const inp_search = document.getElementById('inp-search')
const btn_search = document.getElementById('btn-search')

btn_search.onclick = () => {
  let query = `?q=${inp_search.value.replace(' ', '+')}`
  let a_fake = document.getElementById('a-fake')
  a_fake.href = `search.html${query}`
  a_fake.click()
}