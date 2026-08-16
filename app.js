/* ==========================================================================
   PWA: Departamento de Innovación Educativa (DIE)
   Archivo: app.js
   ========================================================================== */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('DIE PWA: Service Worker registrado.', reg))
            .catch(err => console.error('DIE PWA: Error al registrar el SW.', err));
    });
}

const iniciarBanners = () => {
    // 20 Frases REALES sobre innovación, educación y creatividad
    const frases = [
        { texto: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.", autor: "Nelson Mandela" },
        { texto: "La imaginación es más importante que el conocimiento. El conocimiento es limitado, mientras que la imaginación no.", autor: "Albert Einstein" },
        { texto: "El principal objetivo de la educación es crear personas capaces de hacer cosas nuevas, y no simplemente repetir lo que otras generaciones hicieron.", autor: "Jean Piaget" },
        { texto: "La educación es el encendido de una llama, no el llenado de un recipiente.", autor: "Sócrates" },
        { texto: "La innovación distingue a los líderes de los seguidores.", autor: "Steve Jobs" },
        { texto: "La educación no cambia al mundo, cambia a las personas que van a cambiar el mundo.", autor: "Paulo Freire" },
        { texto: "Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo.", autor: "Benjamin Franklin" },
        { texto: "La creatividad es tan importante en la educación como la alfabetización, y deberíamos tratarla con la misma jerarquía.", autor: "Ken Robinson" },
        { texto: "Nunca andes por el camino trazado, pues él te conduce únicamente hacia donde los otros fueron.", autor: "Alexander Graham Bell" },
        { texto: "Lo que un niño puede hacer hoy con ayuda, será capaz de hacerlo por sí mismo mañana.", autor: "Lev Vygotsky" },
        { texto: "Nada en la vida es para ser temido, es sólo para ser comprendido. Ahora es el momento de comprender más, para que podamos temer menos.", autor: "Marie Curie" },
        { texto: "La educación no es preparación para la vida; la educación es la vida misma.", autor: "John Dewey" },
        { texto: "La primera tarea de la educación es agitar la vida, pero dejándola libre para que se desarrolle.", autor: "Maria Montessori" },
        { texto: "Creatividad es pensar en nuevas ideas. Innovación es hacer cosas nuevas.", autor: "Theodore Levitt" },
        { texto: "En algún lugar, algo increíble está esperando a ser descubierto.", autor: "Carl Sagan" },
        { texto: "Los analfabetos del siglo XXI no serán aquellos que no sepan leer y escribir, sino aquellos que no puedan aprender, desaprender y reaprender.", autor: "Alvin Toffler" },
        { texto: "El valor de una idea radica en el uso de la misma.", autor: "Thomas Edison" },
        { texto: "No es posible resolver los problemas de hoy con las soluciones de ayer.", autor: "Roger Von Oech" },
        { texto: "Lo que conduce y arrastra al mundo no son las máquinas, sino las ideas.", autor: "Victor Hugo" },
        { texto: "Aprender sin reflexionar es malgastar la energía.", autor: "Confucio" }
    ];

    let indiceFrase = 0;
    const txtFrase = document.getElementById('banner-frase-texto');
    const txtAutor = document.getElementById('banner-frase-autor');

    if (txtFrase && txtAutor) {
        // Ejecuta el cambio cada 1 MINUTO (60,000 ms)
        setInterval(() => {
            indiceFrase = (indiceFrase + 1) % frases.length;
            txtFrase.style.opacity = 0;
            txtAutor.style.opacity = 0;
            
            setTimeout(() => {
                txtFrase.textContent = `"${frases[indiceFrase].texto}"`;
                txtAutor.textContent = frases[indiceFrase].autor;
                txtFrase.style.opacity = 1;
                txtAutor.style.opacity = 1;
            }, 500);
        }, 60000); 
    }

    // Rotación de Imágenes de Noticias (En la raíz: 1.png, 2.png, hasta 10.png)
    let indiceImagen = 1;
    const imgNoticias = document.getElementById('banner-noticias-img');

    if (imgNoticias) {
        // Cambia cada 5 segundos
        setInterval(() => {
            indiceImagen++;
            if (indiceImagen > 10) indiceImagen = 1;
            // Llama a la imagen directamente en la raíz
            imgNoticias.src = `${indiceImagen}.png`;
        }, 5000); 
    }
};

document.addEventListener('DOMContentLoaded', () => {
    iniciarBanners();
});
