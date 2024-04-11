import { fetchProducts } from './fetchProducts'
import { newObject } from './newObject'


export function filterDesktop(filter: any) {

  function updateSelectedColors() {
    const selectedColors: string[] = [] 
    const checkboxes = document.querySelectorAll('#colors .checkbox-color')
    const newArray = Array.from(checkboxes)

    newArray.forEach((checkbox: HTMLInputElement) => {
      if (checkbox.checked) {
        selectedColors.push(checkbox.defaultValue)
      }
    })
    filter.color = selectedColors
    
    fetchProducts(filter).then(res => {
      const cartContainers = document.querySelectorAll('.cartContainer')
      cartContainers.forEach(container => {
        container.remove()
      })

      newObject(res.data)
    })
  }
  
  function updateSelectedSizes() {
    const selectedSizes: string[] = [] 
    const checkboxes = document.querySelectorAll('#sizes .checkbox-size')
    const newArray = Array.from(checkboxes)
    
    newArray.forEach((checkbox: HTMLInputElement) => {
      if (checkbox.checked) {
        selectedSizes.push(checkbox.defaultValue)
      }
    })
    filter.size_like = selectedSizes 

    fetchProducts(filter).then(res => {
        const cartContainers = document.querySelectorAll('.cartContainer')
        cartContainers.forEach(container => {
            container.remove()
        })

        newObject(res.data)
    })

  }

  function updateRangePrice() {
    const radios = document.querySelectorAll('#range-price .radio')
    const newArray = Array.from(radios)

    newArray.forEach((radio: HTMLInputElement) => {
      if (radio.checked) {
        const selectedValue = Number(radio.defaultValue)
        filter.price_lte = selectedValue
        if (selectedValue === 50) {
          filter.price_gte = 0
        } else if (selectedValue === 150) {
          filter.price_gte = 51
        } else if(selectedValue === 300) {
          filter.price_gte = 151
        } else if (selectedValue === 500) {
          filter.price_gte = 301
        } else if (selectedValue === 501) {
          delete filter.price_lte
          filter.price_gte = selectedValue
        } else {
          delete filter.price_lte
          delete filter.price_gte
        }      
      }
    })
    
    fetchProducts(filter).then(res => {
      const cartContainers = document.querySelectorAll('.cartContainer')
      cartContainers.forEach(container => {
        container.remove()
      })

      newObject(res.data)
    })
  }

  document.querySelectorAll('.dropdown-content button').forEach(element => {
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
  
  document.querySelectorAll('#range-price .radio').forEach((radio) => {
    radio.addEventListener('change', updateRangePrice)
  })

  document.querySelectorAll('#sizes .checkbox-size').forEach((checkbox) => {
    checkbox.addEventListener('change', updateSelectedSizes)

  })
  
  document.querySelectorAll('#colors .checkbox-color').forEach((checkbox) => {
    checkbox.addEventListener('change', updateSelectedColors)
  })
}
