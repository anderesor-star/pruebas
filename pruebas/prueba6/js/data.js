let ingredientes = JSON.parse(localStorage.getItem("misIngredientes")) || {};

function guardarEnDisco() {
    localStorage.setItem("misIngredientes", JSON.stringify(ingredientes));
};

function actualizarInterfaz() {
    const contenedor = document.getElementById("contenedor-bloques");
    
    // 🛡️ EL ESCUDO: Si 'contenedor' es null (porque estamos en añadir-ingredientes.html),
    // la función se frena aquí (return) y no da el error de innerHTML.
    if (!contenedor) {
        return; 
    }
    
    // Si pasa del 'if', significa que SÍ estamos en la página de la lista
    contenedor.innerHTML = "";

    for (const nombre in ingredientes) {
        const bloque = document.createElement("div");
        bloque.classList.add("tarjeta-ingrediente");

        const titulo = document.createElement("h4");
        titulo.textContent = nombre;
        bloque.appendChild(titulo);

        const listaPropiedades = document.createElement("ul");

        for (const propiedad in ingredientes[nombre]) {
            const valor = ingredientes[nombre][propiedad];
            const item = document.createElement("li");
            item.innerHTML = `<strong>${propiedad}:</strong> ${valor}`;
            listaPropiedades.appendChild(item);
        }

        bloque.appendChild(listaPropiedades);
        contenedor.appendChild(bloque);
    }
};

function anadirNombre(nombreIngrediente) {
    ingredientes['nombre'] = {nombreIngrediente};

    guardarEnDisco();
    actualizarInterfaz();
};

function anadirPropiedades(nombreIngrediente, propiedad, resultado) {

    if (ingredientes[nombreIngrediente]){
        ingredientes[nombreIngrediente][propiedad] = resultado;

        guardarEnDisco();
        actualizarInterfaz();
    } else {
        console.warn("El ${nombreIngrediente} no existe en el sistema. Revise si está bien escrito.");
    }

};

function ejecutarAnadirNombre() {
    const inputNombre = document.getElementById("input-nombre");
    const nombre = inputNombre.value.trim(); 

    if (nombre === "") {
        alert("Por favor, escriba el nombre de un ingrediente.");
        return;
    }

    anadirNombre(nombre);
    inputNombre.value = "";
};

function ejecutarAnadirPropiedades() {
    const ingredienteDestino = document.getElementById("input-ingrediente-destino").value.trim();
    const propiedad = document.getElementById("input-propiedad").value.trim();
    const valor = document.getElementById("input-valor").value.trim();

    if (ingredienteDestino === "" || propiedad === "" || valor === "") {
        alert("Debes rellenar los tres campos para añadir una propiedad.");
        return;
    }

    anadirPropiedades(ingredienteDestino, propiedad, valor);

    document.getElementById("input-propiedad").value = "";
    document.getElementById("input-valor").value = "";
};

actualizarInterfaz();

fetch('header.html')
.then(response => response.text())
.then(data => {
     document.getElementById('header-dinamico').innerHTML = data;
})
.catch(error => console.error('Error al cargar el header:', error));
