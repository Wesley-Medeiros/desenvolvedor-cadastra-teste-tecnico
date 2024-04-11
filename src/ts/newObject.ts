import { Produto} from './typings'


export function newObject(produtos: Produto[]) {
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
