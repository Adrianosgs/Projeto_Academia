const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
if (currentPage.includes(item.getAtribute("href"))) {
item.classList.add("active")
  }
}