const precio1 = 3.50
const redondeo1 = 0.95

function prettyPrice(precio, decimales) {
    if (Number.isInteger(decimales)){
        decimales = decimales * 0.01;
    };

    return Math.floor(precio) + decimales;
}

const final = prettyPrice(precio1, redondeo1)
console.log(final);

const prueba = prettyPrice(5.80, 99)
console.log(prueba)
