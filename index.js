window.onload = function () {
            document.getElementById('visite-date').valueAsDate = new Date();
            localStorage.clear();
            // Efface tout le sessionStorage
            sessionStorage.clear();

            window.addEventListener("load", () => {

                // Si tu veux aussi vider tous les inputs et textarea
                document.querySelectorAll("input, textarea").forEach(el => {
                el.value = "";
                });
            });
       }
        function setupCanvas(canvasId) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;

            let painting = false;

            function startPosition(e) {
                painting = true;
                draw(e);
                e.preventDefault(); // Empêche le comportement par défaut
            }

            function endPosition(e) {
                painting = false;
                ctx.beginPath();
                e.preventDefault(); // Empêche le comportement par défaut
            }

            function draw(e) {
                if (!painting) return;
                const rect = canvas.getBoundingClientRect();
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#000';

                let clientX, clientY;
                if (e.touches && e.touches.length > 0) {
                    // Utiliser les coordonnées du premier touch point
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    // Utiliser les coordonnées de la souris
                    clientX = e.clientX;
                    clientY = e.clientY;
                }

                ctx.lineTo(clientX - rect.left, clientY - rect.top);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(clientX - rect.left, clientY - rect.top);
                e.preventDefault(); // Empêche le comportement par défaut
            }

            // Ajouter des écouteurs pour les événements de souris
            canvas.addEventListener('mousedown', startPosition);
            canvas.addEventListener('mouseup', endPosition);
            canvas.addEventListener('mouseout', endPosition);
            canvas.addEventListener('mousemove', draw);

            // Ajouter des écouteurs pour les événements tactiles
            canvas.addEventListener('touchstart', startPosition);
            canvas.addEventListener('touchend', endPosition);
            canvas.addEventListener('touchcancel', endPosition);
            canvas.addEventListener('touchmove', draw);
        }

        // Initialisation
        setupCanvas('drawingCanvas1');

        // Bouton pour effacer
        function clearCanvas(canvasId) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function printDocument(){
             setTimeout(() => {
                window.print();

      // Restauration après impression
      document.body.innerHTML = originalBody;
    }, 500);
}