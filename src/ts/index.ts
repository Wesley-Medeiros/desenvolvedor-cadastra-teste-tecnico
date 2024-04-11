import { domElements } from './domElements'
import { showMore } from './showMore'
import { filterDesktop } from './filterDesktop'
import { filterMobile } from './filterMobile'
import { Filter } from './typings'

function main() {

  let filter: Filter = {}

  domElements()
  filterMobile(filter)
  filterDesktop(filter)
  showMore(filter)
}     
  
  

document.addEventListener("DOMContentLoaded", main)
