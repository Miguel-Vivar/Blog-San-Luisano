document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("modo-oscuro-toggle");
    const body = document.body;
    toggleBtn.addEventListener("click", function() {
    body.classList.toggle("modo-oscuro");
    });
});  
document.addEventListener("DOMContentLoaded", function () {
    const formulariosComentario = document.querySelectorAll('.form-comentario');
    const botonesAgregarComentario = document.querySelectorAll('.agregar-comentario-btn'); 
    formulariosComentario.forEach((formComentario, index) => {
    botonesAgregarComentario[index].addEventListener('click', function () {
        const nombre = formComentario.querySelector('.nombre').value;
        const comentario = formComentario.querySelector('.comentario').value;
        let comentariosExist = localStorage.getItem(`comentarios_${index}`) || '[]';
        comentariosExist = JSON.parse(comentariosExist);
        const nuevoComentario = { nombre, comentario };
        comentariosExist.push(nuevoComentario);
        localStorage.setItem(`comentarios_${index}`, JSON.stringify(comentariosExist));
        const comentariosLista = formComentario.previousElementSibling;
        const nuevoComentarioElemento = document.createElement('p');
        nuevoComentarioElemento.textContent = `${nombre}: ${comentario}`;
        comentariosLista.appendChild(nuevoComentarioElemento);
        formComentario.querySelector('.nombre').value = '';
        formComentario.querySelector('.comentario').value = '';
    });
    const comentariosLista = formComentario.previousElementSibling;
    const comentariosExist = localStorage.getItem(`comentarios_${index}`) || '[]';
    const comentariosParseados = JSON.parse(comentariosExist);
    comentariosParseados.forEach(comentario => {
        const comentarioElemento = document.createElement('p');
        comentarioElemento.textContent = `${comentario.nombre}: ${comentario.comentario}`;
        comentariosLista.appendChild(comentarioElemento);
    });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const usernameDisplay = document.getElementById("username-display");
    checkAuthentication();
    loginBtn.addEventListener("click", function() {
        window.location.href = "login.html";
    });
    logoutBtn.addEventListener("click", function() {
        logout();
    });
});
function checkAuthentication() {
}
function logout() {
}
document.addEventListener("DOMContentLoaded", function() {
    const createAccountBtn = document.getElementById("create-account-btn");
    createAccountBtn.addEventListener("click", function() {
        window.location.href = "signup.html";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const contenedoresEstrellas = document.querySelectorAll(".estrellas");
    contenedoresEstrellas.forEach(contenedorEstrellas => {
        const estrellas = contenedorEstrellas.querySelectorAll("span");
        let calificacion = parseInt(contenedorEstrellas.getAttribute("data-rating"));
        estrellas.forEach((estrella, index) => {
            estrella.addEventListener("click", function () {
                calificacion = index + 1;
                actualizarEstrellas(estrellas, calificacion);
                contenedorEstrellas.setAttribute("data-rating", calificacion);
                actualizarPromedio();
            });
        });
        actualizarEstrellas(estrellas, calificacion);
        const enviarCalificacionBtn = contenedorEstrellas.nextElementSibling;
        enviarCalificacionBtn.addEventListener("click", function () {
            enviarCalificacion(calificacion);
        });
    });
    function actualizarEstrellas(estrellas, calificacion) {
        estrellas.forEach((estrella, index) => {
            estrella.classList.toggle("active", index < calificacion);
        });
    }
    function enviarCalificacion(calificacion) {
        console.log("Enviando calificación al servidor:", calificacion);
        actualizarPromedio();
    }
    function actualizarPromedio() {
        const todasLasCalificaciones = Array.from(contenedoresEstrellas).map(contenedor => parseInt(contenedor.getAttribute("data-rating")));
        const sumaCalificaciones = todasLasCalificaciones.reduce((total, calificacion) => total + calificacion, 0);
        const promedio = sumaCalificaciones / todasLasCalificaciones.length;
        const promedioValor = document.querySelector(".promedio-valor");
        promedioValor.textContent = promedio.toFixed(1);
    }
});
