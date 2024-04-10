function main() {

  let filter: Filter = {
    price_lte: 0,
    price_gte: 0
  }

  var acc = document.getElementsByClassName("filterButtonDropdown")
  var i

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active")
      var panel = this.nextElementSibling
      if (panel.style.display === "block") {
        panel.style.display = "none"
      } else {
        panel.style.display = "block"
      }
    })
  }

  var modal2 = document.getElementById("filterModal")
  var modal = document.getElementById("orderModal")

  var btn = document.getElementById("orderButton")
  var btn2 = document.getElementById("filterButton")
  var span = document.querySelector<HTMLSpanElement>('#close')
  var span2 = document.querySelector<HTMLSpanElement>('#filterSpan')


  btn.onclick = function() {
    modal.style.display = "block"
  }
  btn2.onclick = function() {
    modal2.style.display = "block"
  }


  span.onclick = function() {
    modal.style.display = "none"
  }
  span2.onclick = function() {
    modal2.style.display = "none"
  }
  

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
  window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none"
    }
  }
  

    const titleSeeMore = document.querySelector(".spanDropHide")
    const seeAllColorsContainer = document.querySelector(".hideCheckbox")
  
    titleSeeMore.addEventListener("click", async () => {
      seeAllColorsContainer.classList.toggle("show")
      titleSeeMore.classList.toggle("hidden")
    })

    const titleSeeOrder = document.querySelector(".mainButtonDropdown")
    const seeOrderSelectorContainer = document.querySelector(".dropdown-content")
  
    titleSeeOrder.addEventListener("click", async () => {
      seeOrderSelectorContainer.classList.toggle("show")
      titleSeeOrder.classList.toggle("hidden")
    })

    
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

    interface Produto {
      id: string,
      name: string,
      price: number,
      parcelamento: number[],
      color: string,
      image: string,
      sizes: string[],
      date: string
    }

    function newObject(produtos: Produto[]) {
        const divProdutos = document.querySelector('.cartWrapper')
        const cartContainers = document.querySelectorAll('.cartContainer')
        cartContainers.forEach(container => {
          container.remove()
        })
        produtos.forEach((produto: Produto) => {
          const produtoElemento: HTMLDivElement = document.createElement('div')
          produtoElemento.classList.add('cartContainer')
          const numeroFormatado = produto.parcelamento[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          const preçoTotalFormatado = produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

          produtoElemento.innerHTML = `
          <img class="prdouctImg" src="${produto.image}" alt="${produto.name}">
          <h3>${produto.name}</h3>
          <strong>R$ ${preçoTotalFormatado}</strong>
          <p>até ${produto.parcelamento[0]}x de ${numeroFormatado}</p>
          <button>Comprar</button>
          `  
        
          divProdutos.appendChild(produtoElemento)
        })
    }

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
    
    document.querySelectorAll('#colors .checkbox-color').forEach((checkbox) => {
      checkbox.addEventListener('change', updateSelectedColors)
    })

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

      fetchProducts(filter).then(res => {
        const cartContainers = document.querySelectorAll('.cartContainer')
        cartContainers.forEach(container => {
          container.remove()
        })
  
        newObject(res.data)
      })
  
    }
    
    document.querySelector('#filterModalbuttons .applyButton').addEventListener('click', () => updateSelectedColorsMobile())


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

      fetchProducts(filter).then(res => {
        const cartContainers = document.querySelectorAll('.cartContainer')
        cartContainers.forEach(container => {
          container.remove()
        })
  
        newObject(res.data)
      }) 
    }

    document.querySelector('#filterModalbuttons .applyButton').addEventListener('click', () => updateSelectedSizesMobile())

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

      document.querySelectorAll('#sizes .checkbox-size').forEach((checkbox) => {
        checkbox.addEventListener('change', updateSelectedSizes)

      })
    }
    updateSelectedSizes()

    function updateRangePrice() {
      const radios = document.querySelectorAll('#range-price .radio')
      const newArray = Array.from(radios)
      console.log('radios', radios)
  
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
    
    document.querySelectorAll('#range-price .radio').forEach((radio) => {
      radio.addEventListener('change', updateRangePrice)
    })


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
  
    document.querySelectorAll('.clearButton').forEach(button => {
        button.addEventListener('click', uncheckAll);
  });
    
  
     interface Filter {
      price_lte: number,
      price_gte: number,
      color?: string[],
      size_like?: string[],
      _sort?: string,
      _order?: 'desc' | 'asc'
    }
    
     async function fetchProducts(filter?: Filter, customLimit?: number) {
      let limit = customLimit || 9
      let total_pages = 1
      let current_page = 1
      let next_page = null
      let prev_page = null
    
        const baseUrl = 'http://localhost:5000/products?'
        let queryParams = []
    
        if (filter) {
          const filterKeys = Object.keys(filter) as (keyof Filter)[]
          filterKeys.forEach(key => {
            const filterValue = filter[key]
            if (Array.isArray(filterValue)) {
              filterValue.forEach(value => {
                queryParams.push(`${key}=${value}`)
              })
            } else {
              queryParams.push(`${key}=${filterValue}`)
            }
          })
        }
    
        queryParams.push('_limit=' + limit)
        queryParams.push('_page=' + current_page)
    
        const finalUrl = baseUrl + queryParams.join('&')
    
        try {
            const response = await fetch(finalUrl)
            const dataJson = await response.json()

    
            const total_of_items = parseInt(response.headers.get("x-total-count"))
            total_pages = Math.ceil(total_of_items / limit)
    
            next_page = current_page < total_pages ? current_page + 1 : null
            prev_page = current_page > 1 ? current_page - 1 : null
    
            return {
                metadata: {
                    current_page,
                    next_page,
                    prev_page,
                    total_pages,
                    limit,
                    count: dataJson.length,
                    total: total_of_items,
                },
                data:dataJson,
    
            }
            
        } catch (error) {
            console.error("Não foi possivel buscar os produtos.", error)
            return { error: "Não foi possivel buscar os produtos." }
        }
    }
    
  
  const changeLimitButton = document.getElementById('myBtn')
  const hiddenButton = document.getElementById("myBtn")
      changeLimitButton.addEventListener('click', async () => {
        hiddenButton.classList.toggle("hidden")
          fetchProducts(filter, 14).then(res => {
              newObject(res.data)
          })
      })

      const orderByMobile = document.querySelectorAll('.mainModal button')
      orderByMobile.forEach(element => {
        // o value pode ser any?
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

      const orderBy = document.querySelectorAll('.dropdown-content button')
      orderBy.forEach(element => {
        // o value pode ser any?
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


  }
  
  

document.addEventListener("DOMContentLoaded", main)
