import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

function main() {

  var acc = document.getElementsByClassName("filterButtonDropdown");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  var modal2 = document.getElementById("filterModal")
  var modal = document.getElementById("orderModal");

  var btn = document.getElementById("orderButton");
  var btn2 = document.getElementById("filterButton")
  var span = document.querySelector<HTMLSpanElement>('#close');
  var span2 = document.querySelector<HTMLSpanElement>('#filterSpan');


  btn.onclick = function() {
    modal.style.display = "block";
  }
  btn2.onclick = function() {
    modal2.style.display = "block";
  }


  span.onclick = function() {
    modal.style.display = "none";
  }
  span2.onclick = function() {
    modal2.style.display = "none";
  }
  

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
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

    
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.checkbox-container input');
    const checkboxesSizes = document.querySelectorAll<HTMLInputElement>('.sizesContainer input');
    const applyButton = document.getElementById('filterModalbuttons');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
            applyButton.style.display = anyChecked ? 'flex' : 'none';
        });
    });

    checkboxesSizes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            const anyChecked = Array.from(checkboxesSizes).some(checkbox => checkbox.checked);
            applyButton.style.display = anyChecked ? 'flex' : 'none';
        });
    });
  }
  

document.addEventListener("DOMContentLoaded", main);
