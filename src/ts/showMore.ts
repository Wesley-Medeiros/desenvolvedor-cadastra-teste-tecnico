import { newObject } from './newObject'
import { fetchProducts } from './fetchProducts'
import { Filter } from './typings'

export function showMore(filter: Filter) {

  const changeLimitButton = document.getElementById('myBtn')
  const hiddenButton = document.getElementById("myBtn")
      changeLimitButton.addEventListener('click', async () => {
        console.log('filter', filter)
        hiddenButton.classList.toggle("hidden")
          fetchProducts(filter, 14).then(res => {
              newObject(res.data)
          })
      })
}