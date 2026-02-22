const contenedores = document.getElementById('contenedores');
const btnGenerar = document.getElementById('btnGenerar');
const cantidadCajas = document.getElementById('cantidadCajas');
const formato = document.getElementById('formato');
const tooltip = document.getElementById('tooltip');

let totalCajas = 6;
let tooltipTimer;

function colorHex() {
    let numero = Math.floor(Math.random() * 16777215);
    return '#' + numero.toString(16).padStart(6, '0');
}

function colorHSL() {
    let H = Math.floor(Math.random() * 361);
    let S = Math.floor(Math.random() * 101);
    let L = Math.floor(Math.random() * 101);
    return `hsl(${H}, ${S}%, ${L}%)`;
}

function mostrarTooltip(mensaje) {
    tooltip.textContent = mensaje;
    tooltip.classList.add('visible');
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => tooltip.classList.remove('visible'), 2000);
}

function copiarColor(color) {
    navigator.clipboard.writeText(color).then(() => {
        mostrarTooltip(`¡Copiado! ${color}`);
    });
}

function generarColores() {
    contenedores.innerHTML = '';
    for (let i = 0; i < totalCajas; i++) {
        const caja = document.createElement('div');
        caja.classList.add('caja');
        caja.setAttribute('tabindex', '0');
        caja.setAttribute('role', 'button');

        const color = formato.value === 'hex' ? colorHex() : colorHSL();

        caja.style.backgroundColor = color;
        caja.setAttribute('aria-label', `Color ${color}. Presioná Enter para copiar.`);
        caja.innerHTML = `<span>${color}</span>`;

        caja.addEventListener('click', () => copiarColor(color));
        caja.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copiarColor(color);
            }
        });

        contenedores.appendChild(caja);
    }
}

btnGenerar.addEventListener('click', generarColores);

cantidadCajas.addEventListener('change', () => {
    totalCajas = Number(cantidadCajas.value);
    generarColores();
});

generarColores();