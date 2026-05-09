export function formatInvestment(valueInMillions: number) {
  return `R$ ${valueInMillions.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} milhões`;
}

export function formatShortInvestment(valueInMillions: number) {
  return `R$ ${valueInMillions.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} mi`;
}

export function formatPayback(years: number) {
  return `${years.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} anos`;
}
