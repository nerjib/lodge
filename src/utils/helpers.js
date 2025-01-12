export const currencyFormatter = (e) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    }).format(e);