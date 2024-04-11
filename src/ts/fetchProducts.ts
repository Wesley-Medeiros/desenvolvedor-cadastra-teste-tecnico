import { Filter } from './typings'
  
  export  async function fetchProducts(filter?: Filter, customLimit?: number) {
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

          if(dataJson.length < total_of_items ) {   
            document.getElementById('myBtn').classList.remove('hidden')      
          }
          else {
            document.getElementById('myBtn').classList.add("hidden");   
          }
  
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
