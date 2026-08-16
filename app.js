/* ==========================================================================
   PWA: Departamento de Innovación Educativa (DIE)
   Archivo: app.js
   ========================================================================== */

// 1. Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('DIE PWA: Service Worker registrado.', reg))
            .catch(err => console.error('DIE PWA: Error al registrar el SW.', err));
    });
}

// 2. Lógica de Banners (Inicio)
const iniciarBanners = () => {
    // A. Rotación de Frases sobre Innovación
    const frases = [
        { texto: "Construirse a uno mismo es construir el mundo.", autor: "Modelo Construye" },
        { texto: "La innovación no es tecnología, es una nueva forma de pensar.", autor: "Departamento de Innovación Educativa" },
        { texto: "Aprender para transformar, transformar para educar.", autor: "Ag Lucem" },
        { texto: "El caos es simplemente el orden que aún no entendemos.", autor: "Mago del Caos" }
    ];

    let indiceFrase = 0;
    const txtFrase = document.getElementById('banner-frase-texto');
    const txtAutor = document.getElementById('banner-frase-autor');

    if (txtFrase && txtAutor) {
        setInterval(() => {
            indiceFrase = (indiceFrase + 1) % frases.length;
            // Efecto de desvanecimiento suave (requiere CSS transition en opacity)
            txtFrase.style.opacity = 0;
            txtAutor.style.opacity = 0;
            
            setTimeout(() => {
                txtFrase.textContent = `"${frases[indiceFrase].texto}"`;
                txtAutor.textContent = frases[indiceFrase].autor;
                txtFrase.style.opacity = 1;
                txtAutor.style.opacity = 1;
            }, 500);
        }, 8000); // Cambia cada 8 segundos
    }

    // B. Rotación del Banner de Noticias (1.png a 10.png)
    let indiceImagen = 1;
    const imgNoticias = document.getElementById('banner-noticias-img');

    if (imgNoticias) {
        setInterval(() => {
            indiceImagen++;
            if (indiceImagen > 10) indiceImagen = 1;
            imgNoticias.src = `assets/banners/${indiceImagen}.png`;
        }, 5000); // Cambia cada 5 segundos
    }
};

// 3. Lógica de Ajustes y Personalización
const rootCSS = document.documentElement;

// Cambiar color principal
const cambiarColorPrincipal = (nuevoColor) => {
    rootCSS.style.setProperty('--ij-azul-fuerte', nuevoColor);
    localStorage.setItem('die_color', nuevoColor);
};

// Cambiar Tipografía
const cambiarFuente = (nuevaFuente) => {
    rootCSS.style.setProperty('--fuente-app', nuevaFuente);
    localStorage.setItem('die_fuente', nuevaFuente);
};

// Activar/Desactivar Modo Oscuro
const toggleModoOscuro = (activar) => {
    if (activar) {
        rootCSS.setAttribute('data-theme', 'dark');
        localStorage.setItem('die_tema', 'dark');
    } else {
        rootCSS.removeAttribute('data-theme');
        localStorage.setItem('die_tema', 'light');
    }
};

// Cargar preferencias guardadas al iniciar
const cargarPreferencias = () => {
    const colorGuardado = localStorage.getItem('die_color');
    const fuenteGuardada = localStorage.getItem('die_fuente');
    const temaGuardado = localStorage.getItem('die_tema');

    if (colorGuardado) cambiarColorPrincipal(colorGuardado);
    if (fuenteGuardada) cambiarFuente(fuenteGuardada);
    if (temaGuardado === 'dark') toggleModoOscuro(true);
};

// 4. FUNCIONALIDAD CRÍTICA: Forzar Actualización del Sistema
async function forzarActualizacionSistema() {
    const btn = document.getElementById('btn-forzar-actualizacion');
    const barraContenedor = document.getElementById('progress-container');
    const barraRelleno = document.getElementById('progress-fill');

    if (!btn || !barraContenedor || !barraRelleno) return;

    // Deshabilitar botón para evitar múltiples clics
    btn.disabled = true;
    btn.innerHTML = "🧹 Limpiando sistema...";

    // Mostrar e iniciar la animación de la barra de progreso (10s en CSS)
    barraContenedor.style.display = 'block';
    
    // Pequeño timeout para que el navegador procese el display:block antes de animar
    setTimeout(() => {
        barraRelleno.style.width = '100%';
    }, 50);

    try {
        // A. Borrar la memoria caché del navegador (PWA)
        const cacheNames = await caches.keys();
        for (let name of cacheNames) {
            await caches.delete(name);
            console.log(`DIE PWA: Caché eliminada -> ${name}`);
        }

        // B. Desinstalar el Service Worker actual
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
                await registration.unregister();
                console.log('DIE PWA: Service Worker desinstalado.');
            }
        }
    } catch (error) {
        console.error("DIE PWA: Error durante la limpieza del sistema", error);
    }

    // C. Forzar la recarga después de los 10 segundos visuales
    setTimeout(() => {
        // window.location.reload(true) recarga ignorando la caché del navegador
        window.location.reload(true); 
    }, 10000);
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    cargarPreferencias();
    iniciarBanners();

    // Listener para el botón de actualización en la sección Ajustes
    const btnActualizar = document.getElementById('btn-forzar-actualizacion');
    if (btnActualizar) {
        btnActualizar.addEventListener('click', forzarActualizacionSistema);
    }
});
