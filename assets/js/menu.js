const btn_filter = document.getElementById('btn_filter')

btn_filter.onfocus = displayAndAlignDropDown

function displayAndAlignDropDown() {
  const dropDown = document.querySelector('.con_drop_down')
  dropDown.style.display = "block"
  
  let btn_right = (window.innerWidth - btn_filter.getBoundingClientRect().right - btn_filter.getBoundingClientRect().width).toString()
  let btn_bottom = btn_filter.getBoundingClientRect().bottom.toString()
  
  dropDown.style.right = btn_right + 'px'
  dropDown.style.top = btn_bottom + 'px'
}