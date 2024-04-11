import { fetchProducts } from './fetchProducts'
import { newObject } from "./newObject"

export function filterMobile(filter: any) {

  function updateSelectedColorsMobile() {
    const selectedColorsMobile: string[] = []
    const checkboxesMobile = document.querySelectorAll('#colors-mobile .checkbox-input-mobile')
    const newArray = Array.from(checkboxesMobile)

    newArray.forEach((checkbox: HTMLInputElement) => {
      if (checkbox.checked) {
        selectedColorsMobile.push(checkbox.defaultValue)
      }
    })
    filter.color = selectedColorsMobile
  }
  
  function updateSelectedSizesMobile() {
    const selectedSizesMobile: string[] = []
    const checkboxes = document.querySelectorAll('#sizes-mobile .checkbox-size')
    const newArray = Array.from(checkboxes)

    newArray.forEach((checkbox: HTMLInputElement) => {
      if (checkbox.checked) {
        selectedSizesMobile.push(checkbox.defaultValue)
      }
  })
  filter.size_like = selectedSizesMobile

  }

  function updateRangePriceMobile() {
    const radios = document.querySelectorAll('#range-price-mobile .radio-mobile')
    const newArray = Array.from(radios)

    newArray.forEach((radio: HTMLInputElement) => {
      if (radio.checked) {
        const selectedValueMobile = Number(radio.defaultValue)
        filter.price_lte = selectedValueMobile
        if (selectedValueMobile === 50) {
          filter.price_gte = 0
        } else if (selectedValueMobile === 150) {
          filter.price_gte = 51
        } else if(selectedValueMobile === 300) {
          filter.price_gte = 151
        } else if (selectedValueMobile === 500) {
          filter.price_gte = 301
        } else if (selectedValueMobile === 501) {
          delete filter.price_lte
          filter.price_gte = selectedValueMobile
        } else {
          delete filter.price_lte
          delete filter.price_gte
        }
      }
    })
  }
  

  function handleApplyFilters() {
    updateSelectedColorsMobile()
    updateSelectedSizesMobile()
    updateRangePriceMobile()

    fetchProducts(filter).then(res => {
      const cartContainers = document.querySelectorAll('.cartContainer')
      cartContainers.forEach(container => {
        container.remove()
      })

      newObject(res.data)
    }) 
  }

  function uncheckAll() {
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]')
        .forEach((input: HTMLInputElement) => {
            input.checked = false
        });
        
        fetchProducts().then(res => {
          const cartContainers = document.querySelectorAll('.cartContainer')
          cartContainers.forEach(container => {
            container.remove()
          })
  
          newObject(res.data)
        })
}

const checkboxes = document.querySelectorAll<HTMLInputElement>('.checkbox-container-mobile input')
    const checkboxesSizes = document.querySelectorAll<HTMLInputElement>('.checkboxSizesContainerMobile input')
    const radioPrice = document.querySelectorAll<HTMLInputElement>('.radio-price-container input')
    const applyButton = document.getElementById('filterModalbuttons')

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked)
            applyButton.style.display = anyChecked ? 'flex' : 'none'
        })
    })

    checkboxesSizes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            const anyChecked = Array.from(checkboxesSizes).some(checkbox => checkbox.checked)
            applyButton.style.display = anyChecked ? 'flex' : 'none'
        })
    })

    radioPrice.forEach(function (radio) {
      radio.addEventListener('click', function () {
          const anyChecked = Array.from(radioPrice).some(radio => radio.checked)
          applyButton.style.display = anyChecked ? 'flex' : 'none'
      })
  })

document.querySelectorAll('.mainModal button').forEach(element => {
  element.addEventListener('click', (value: any) => {
    if (value.target.value === 'now') {
      filter._sort = 'date'
      filter._order = 'asc' 
    } else {
      filter._sort = 'price' 
      filter._order = value.target.value
    }
    fetchProducts(filter, 9).then(res => {
      newObject(res.data)
    })
  })
})

  document.querySelector('.clearButton').addEventListener('click', () => uncheckAll());


  document.querySelector('#filterModalbuttons .applyButton').addEventListener('click', () => handleApplyFilters())

}