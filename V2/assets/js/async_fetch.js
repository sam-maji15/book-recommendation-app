import { createSearchResultElement } from './create_element.js'


export default function fetchBookDetails(query) {
  
  let link = `https://www.googleapis.com/books/v1/volumes${query}`
  
  fetch(link)
  .then(response => {
    if (response.ok) return response.json()
    else if(!response.ok) {
      let error = new Error()
      error.status = response.status
      throw error
    }
  })
  .then(data => {
    data = data.items
    let searchResults = data.map((item,index) => {
      
      let subtitle = item.volumeInfo.subtitle || ""
      if (subtitle !== "") subtitle = " - "+subtitle
      
      let imgDetails = item.volumeInfo.imageLinks || {}
      let author = item.volumeInfo.authors || []
      
      let industryIdentifiers = item. volumeInfo.industryIdentifiers || ['no industryIdentifier']
      
      
      return {
        isbn: industryIdentifiers[0].identifier || 'no isbn',
        title: item.volumeInfo.title,
        titleFull : item.volumeInfo.title + subtitle,
        author: author.join(", "),
        smallImg: imgDetails.smallThumbnail || "#",
        bigImg : imgDetails.thumbnail || "#"
      }
    })
    return searchResults
  })
  .then(processedData => {
    processedData.forEach((item, index) => {
      console.log(item.isbn)
      createSearchResultElement(document.getElementById("con_searchResults"), item)
    })
    return processedData
  }).then(cachingData => {
    
    cachingData.map(item => {
      localStorage.setItem(
        item.isbn,
        btoa(JSON.stringify(item))
      )
    })
    
    
  })
  /*.catch(error => defaultErrorHandler(error, {}))*/
}

function defaultErrorHandler(error, callbacks) {
  if (error.name === "Error") {
    switch (error.status) {
      case 404:
        console.log("404 page not found")
        break
    }
    
  } else if (error.name === "TypeError") {
    console.log("Just a type error,  maybe something is undefined")
  }
}


export {
  defaultErrorHandler
}