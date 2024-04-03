import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {
  
    
    document.querySelector(".dropDown").addEventListener("click", async () => {
      document.querySelector(".dropDown").classList.toggle("show");
    })
    const titleSeeMore = document.querySelector(".spanDropHide")
    const seeAllColorsContainer = document.querySelector(".hideCheckbox")
  
    titleSeeMore.addEventListener("click", async () => {
      seeAllColorsContainer.classList.toggle("show")
      titleSeeMore.classList.toggle("hidden")
    })
  
  }
  

document.addEventListener("DOMContentLoaded", main);
