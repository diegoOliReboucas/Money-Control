export const dateFormater = new Intl.DateTimeFormat('pt-BR')

export const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: "BRL",
})