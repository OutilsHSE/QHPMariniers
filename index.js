// Initialisation au chargement de la page
window.onload = function () {
    // Définir la date du jour par défaut
    document.getElementById('visite-date').valueAsDate = new Date();

    // Réinitialiser uniquement les champs du formulaire (pas tout le localStorage/sessionStorage)
    document.querySelectorAll("input:not([type='date']), textarea").forEach(el => {
        if (el.type !== 'date') {
            el.value = "";
        }
    });

    // Réinitialiser le select au premier choix
    const selectBateau = document.getElementById('choixBateau');
    if (selectBateau) {
        selectBateau.selectedIndex = 0;
    }
}
/**
 * Configuration du canvas pour la signature
 * @param {string} canvasId - L'ID du canvas à initialiser
 */
function setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas avec l'ID "${canvasId}" introuvable`);
        return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
        e.preventDefault();
    }

    function endPosition(e) {
        painting = false;
        ctx.beginPath();
        e.preventDefault();
    }

    function draw(e) {
        if (!painting) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';

        // Récupération des coordonnées (souris ou tactile)
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Dessiner la ligne
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        e.preventDefault();
    }

    // Événements souris
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseout', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Événements tactiles (mobile/tablette)
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchcancel', endPosition);
    canvas.addEventListener('touchmove', draw);
}

// Initialisation du canvas de signature au chargement
setupCanvas('drawingCanvas1');

/**
 * Efface le contenu d'un canvas
 * @param {string} canvasId - L'ID du canvas à effacer
 */
function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas avec l'ID "${canvasId}" introuvable`);
        return;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Fonction d'impression du document
function printDocument() {
    // Lancer simplement l'impression
    // Les styles @media print dans le CSS gèrent l'affichage
    window.print();
}