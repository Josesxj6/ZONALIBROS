const usuariosIniciales = [
    {
        usuario: "administrador",
        password: "Admin123@",
        rol: "admin"
    },
    {
        usuario: "publico",
        password: "Publico123@",
        rol: "publico"
    }
];

const librosIniciales = [
    {
        id: 1,
        titulo: "La Odisea",
        autor: "Homero",
        editorial: "Cátedra",
        precio: 12990,
        imagen: "img/odisea.svg",
        descripcion: "La gran epopeya del regreso de Odiseo a Ítaca después de la guerra de Troya. Aventuras, dioses, monstruos y decisiones humanas se mezclan en uno de los relatos más influyentes de la literatura occidental."
    },
    {
        id: 2,
        titulo: "La Ilíada",
        autor: "Homero",
        editorial: "Gredos",
        precio: 13990,
        imagen: "img/iliada.svg",
        descripcion: "Poema épico situado durante la guerra de Troya. La obra gira en torno a la ira de Aquiles, el honor de los guerreros y el destino de griegos y troyanos."
    },
    {
        id: 3,
        titulo: "La República",
        autor: "Platón",
        editorial: "Gredos",
        precio: 14990,
        imagen: "img/republica.svg",
        descripcion: "Diálogo filosófico en el que Platón reflexiona sobre la justicia, la educación, el gobierno y la sociedad ideal. Incluye la conocida alegoría de la caverna."
    },
    {
        id: 4,
        titulo: "Meditaciones",
        autor: "Marco Aurelio",
        editorial: "Alianza Editorial",
        precio: 11990,
        imagen: "img/meditaciones.svg",
        descripcion: "Reflexiones personales del emperador romano Marco Aurelio sobre la disciplina, el deber, la virtud y la forma de enfrentar las dificultades desde el pensamiento estoico."
    },
    {
        id: 5,
        titulo: "Vidas Paralelas",
        autor: "Plutarco",
        editorial: "Gredos",
        precio: 16990,
        imagen: "img/vidas-paralelas.svg",
        descripcion: "Plutarco compara las vidas de grandes figuras griegas y romanas para mostrar sus virtudes, errores y decisiones. Una obra fundamental para acercarse a personajes de la Antigüedad."
    },
    {
        id: 6,
        titulo: "La Eneida",
        autor: "Virgilio",
        editorial: "Cátedra",
        precio: 13990,
        imagen: "img/eneida.svg",
        descripcion: "Epopeya romana que cuenta el viaje de Eneas desde la caída de Troya hasta Italia. El relato conecta mito, destino y los orígenes legendarios de Roma."
    }
];

if (localStorage.getItem("zonaLibrosVersion") !== "mundoAntiguoV2") {
    localStorage.setItem("zonaLibrosCatalogo", JSON.stringify(librosIniciales));
    localStorage.setItem("zonaLibrosVersion", "mundoAntiguoV2");
}

if (!localStorage.getItem("zonaLibrosUsuarios")) {
    localStorage.setItem("zonaLibrosUsuarios", JSON.stringify([]));
}


const videoOriginal = "videos/289640.mp4";

if (localStorage.getItem("zonaLibrosVideoVersion") !== "videoLocalV1") {
    localStorage.setItem(
        "zonaLibrosVideo",
        JSON.stringify({
            ruta: videoOriginal,
            visible: true
        })
    );

    localStorage.setItem("zonaLibrosVideoVersion", "videoLocalV1");
}

function obtenerVideo() {
    return JSON.parse(localStorage.getItem("zonaLibrosVideo")) || {
        ruta: videoOriginal,
        visible: true
    };
}

function guardarVideo(video) {
    localStorage.setItem("zonaLibrosVideo", JSON.stringify(video));
}

function actualizarVideo() {
    const configuracion = obtenerVideo();
    const videos = document.querySelectorAll(".video-dinamico");
    const seccionesPublicas = document.querySelectorAll(".video-publico-seccion");
    const previewAdmin = document.getElementById("previewVideoAdmin");
    const rutaVideo = document.getElementById("rutaVideo");

    if (rutaVideo) {
        rutaVideo.value = configuracion.ruta || "";
    }

    seccionesPublicas.forEach(function (seccion) {
        if (configuracion.visible && configuracion.ruta !== "") {
            seccion.style.display = "block";
        } else {
            seccion.style.display = "none";
        }
    });

    if (previewAdmin) {
        if (configuracion.visible && configuracion.ruta !== "") {
            previewAdmin.style.display = "block";
        } else {
            previewAdmin.style.display = "none";
        }
    }

    videos.forEach(function (video) {
        if (configuracion.visible && configuracion.ruta !== "") {
            if (video.getAttribute("src") !== configuracion.ruta) {
                video.src = configuracion.ruta;
                video.load();
            }
        } else {
            video.removeAttribute("src");
            video.load();
        }
    });
}

actualizarVideo();

const videoForm = document.getElementById("videoForm");

if (videoForm) {
    videoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const ruta = document.getElementById("rutaVideo").value.trim();
        const mensaje = document.getElementById("mensajeVideo");

        if (ruta === "") {
            mensaje.className = "error";
            mensaje.textContent = "Ingrese la ruta o URL de un video.";
            return;
        }

        guardarVideo({
            ruta: ruta,
            visible: true
        });

        mensaje.className = "mensaje";
        mensaje.textContent = "Video actualizado correctamente.";
        actualizarVideo();
    });
}

const eliminarVideoBoton = document.getElementById("eliminarVideo");

if (eliminarVideoBoton) {
    eliminarVideoBoton.addEventListener("click", function () {
        const confirmar = confirm("¿Desea eliminar el video de la tienda?");

        if (!confirmar) {
            return;
        }

        guardarVideo({
            ruta: "",
            visible: false
        });

        const mensaje = document.getElementById("mensajeVideo");
        mensaje.className = "mensaje";
        mensaje.textContent = "Video eliminado de la página principal y de la vista del cliente.";
        actualizarVideo();
    });
}

const restaurarVideoBoton = document.getElementById("restaurarVideo");

if (restaurarVideoBoton) {
    restaurarVideoBoton.addEventListener("click", function () {
        guardarVideo({
            ruta: videoOriginal,
            visible: true
        });

        const mensaje = document.getElementById("mensajeVideo");
        mensaje.className = "mensaje";
        mensaje.textContent = "Video original restaurado.";
        actualizarVideo();
    });
}


function obtenerLibros() {
    return JSON.parse(localStorage.getItem("zonaLibrosCatalogo")) || [];
}

function guardarLibros(libros) {
    localStorage.setItem("zonaLibrosCatalogo", JSON.stringify(libros));
}

function obtenerUsuariosRegistrados() {
    return JSON.parse(localStorage.getItem("zonaLibrosUsuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("zonaLibrosUsuarios", JSON.stringify(usuarios));
}

function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

function mostrarCatalogo(idContenedor) {
    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) {
        return;
    }

    const libros = obtenerLibros();
    contenedor.innerHTML = "";

    libros.forEach(function (libro) {
        contenedor.innerHTML += `
            <article class="libro">
                <img src="${libro.imagen}" alt="${libro.titulo}">
                <div class="libro-contenido">
                    <h3>${libro.titulo}</h3>
                    <p class="libro-meta">${libro.autor}</p>
                    <p class="libro-meta">${libro.editorial}</p>
                    <p class="precio">${formatearPrecio(libro.precio)}</p>
                    <button type="button" onclick="verLibro(${libro.id})">Ver libro</button>
                </div>
            </article>
        `;
    });
}

function verLibro(id) {
    const libros = obtenerLibros();
    const libro = libros.find(function (item) {
        return item.id === id;
    });

    const modal = document.getElementById("modalLibro");

    if (!libro || !modal) {
        return;
    }

    document.getElementById("modalImagen").src = libro.imagen;
    document.getElementById("modalImagen").alt = libro.titulo;
    document.getElementById("modalTitulo").textContent = libro.titulo;
    document.getElementById("modalAutor").textContent = libro.autor;
    document.getElementById("modalEditorial").textContent = libro.editorial;
    document.getElementById("modalPrecio").textContent = formatearPrecio(libro.precio);
    document.getElementById("modalDescripcion").textContent = libro.descripcion;

    modal.classList.add("activo");
}

function cerrarDetalleLibro() {
    const modal = document.getElementById("modalLibro");

    if (modal) {
        modal.classList.remove("activo");
    }
}

mostrarCatalogo("catalogoInicio");
mostrarCatalogo("catalogoPublico");

const modalLibro = document.getElementById("modalLibro");

if (modalLibro) {
    modalLibro.addEventListener("click", function (event) {
        if (event.target === modalLibro) {
            cerrarDetalleLibro();
        }
    });
}

const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmarPassword = document.getElementById("confirmarPassword").value;
        const telefono = document.getElementById("telefono").value.trim();
        const generos = document.querySelectorAll('input[name="genero"]:checked');

        const errorNombre = document.getElementById("errorNombre");
        const errorCorreo = document.getElementById("errorCorreo");
        const errorPassword = document.getElementById("errorPassword");
        const errorConfirmar = document.getElementById("errorConfirmar");
        const errorTelefono = document.getElementById("errorTelefono");
        const errorGenero = document.getElementById("errorGenero");
        const mensajeRegistro = document.getElementById("mensajeRegistro");

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorPassword.textContent = "";
        errorConfirmar.textContent = "";
        errorTelefono.textContent = "";
        errorGenero.textContent = "";
        mensajeRegistro.textContent = "";

        let valido = true;
        const formatoNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
        const formatoCorreo = /^[^\s@]+@duoc\.cl$/;

        if (nombre === "" || nombre.length > 100 || !formatoNombre.test(nombre)) {
            errorNombre.textContent = "Ingrese un nombre válido usando solo letras y espacios.";
            valido = false;
        }

        if (correo.length > 60 || !formatoCorreo.test(correo)) {
            errorCorreo.textContent = "El correo debe tener formato usuario@duoc.cl.";
            valido = false;
        }

        const usuarios = obtenerUsuariosRegistrados();
        let correoExiste = false;

        usuarios.forEach(function (usuario) {
            if (usuario.correo === correo) {
                correoExiste = true;
            }
        });

        if (correoExiste) {
            errorCorreo.textContent = "Este correo ya está registrado.";
            valido = false;
        }

        const mayuscula = /[A-Z]/;
        const minuscula = /[a-z]/;
        const numero = /[0-9]/;
        const especial = /[@#$%&*!?._-]/;

        if (
            password.length < 10 ||
            !mayuscula.test(password) ||
            !minuscula.test(password) ||
            !numero.test(password) ||
            !especial.test(password)
        ) {
            errorPassword.textContent = "La contraseña debe tener mínimo 10 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
            valido = false;
        }

        if (password !== confirmarPassword) {
            errorConfirmar.textContent = "Las contraseñas no coinciden.";
            valido = false;
        }

        if (telefono !== "" && !/^\+?[0-9]{8,15}$/.test(telefono)) {
            errorTelefono.textContent = "Ingrese un teléfono válido.";
            valido = false;
        }

        if (generos.length == 0) {
            errorGenero.textContent = "Debe seleccionar al menos una temática favorita.";
            valido = false;
        }

        if (!valido) {
            return;
        }

        const tematicasSeleccionadas = [];

        generos.forEach(function (genero) {
            tematicasSeleccionadas.push(genero.value);
        });

        const nuevoUsuario = {
            nombre: nombre,
            correo: correo,
            password: password,
            telefono: telefono,
            genero: tematicasSeleccionadas,
            rol: "publico"
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        mensajeRegistro.textContent = "Registro realizado correctamente.";
        registroForm.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = document.getElementById("usuarioLogin").value.trim().toLowerCase();
        const password = document.getElementById("passwordLogin").value;
        const errorLogin = document.getElementById("errorLogin");

        errorLogin.textContent = "";

        const usuarioSistema = usuariosIniciales.find(function (cuenta) {
            return cuenta.usuario === usuario && cuenta.password === password;
        });

        if (usuarioSistema) {
            localStorage.setItem("zonaLibrosSesion", JSON.stringify(usuarioSistema));

            if (usuarioSistema.rol === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "cliente.html";
            }

            return;
        }

        const usuarios = obtenerUsuariosRegistrados();
        const usuarioRegistrado = usuarios.find(function (cuenta) {
            return cuenta.correo === usuario && cuenta.password === password;
        });

        if (usuarioRegistrado) {
            localStorage.setItem(
                "zonaLibrosSesion",
                JSON.stringify({
                    usuario: usuarioRegistrado.correo,
                    nombre: usuarioRegistrado.nombre,
                    rol: "publico"
                })
            );

            window.location.href = "cliente.html";
            return;
        }

        errorLogin.textContent = "Usuario o contraseña incorrectos.";
    });
}

const recuperarForm = document.getElementById("recuperarForm");

if (recuperarForm) {
    recuperarForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const correo = document.getElementById("correoRecuperar").value.trim().toLowerCase();
        const mensaje = document.getElementById("mensajeRecuperar");
        const usuarios = obtenerUsuariosRegistrados();
        let encontrado = false;

        usuarios.forEach(function (usuario) {
            if (usuario.correo === correo) {
                encontrado = true;
            }
        });

        if (encontrado) {
            mensaje.className = "mensaje";
            mensaje.textContent = "Se enviaron instrucciones de recuperación al correo registrado.";
        } else {
            mensaje.className = "error";
            mensaje.textContent = "El correo ingresado no se encuentra registrado.";
        }
    });
}

function obtenerSesion() {
    return JSON.parse(localStorage.getItem("zonaLibrosSesion"));
}

function cerrarSesion() {
    localStorage.removeItem("zonaLibrosSesion");
    window.location.href = "login.html";
}

const cerrarSesionBoton = document.getElementById("cerrarSesion");

if (cerrarSesionBoton) {
    cerrarSesionBoton.addEventListener("click", cerrarSesion);
}

if (window.location.pathname.endsWith("cliente.html")) {
    const sesion = obtenerSesion();

    if (!sesion) {
        window.location.href = "login.html";
    } else {
        const bienvenida = document.getElementById("bienvenidaCliente");

        if (sesion.nombre) {
            bienvenida.textContent = "Bienvenido, " + sesion.nombre;
        }
    }
}

if (window.location.pathname.endsWith("admin.html")) {
    const sesion = obtenerSesion();

    if (!sesion || sesion.rol !== "admin") {
        window.location.href = "login.html";
    }
}

function mostrarLibrosAdmin() {
    const contenedor = document.getElementById("listaAdminLibros");

    if (!contenedor) {
        return;
    }

    const libros = obtenerLibros();

    let tabla = `
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Editorial</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    libros.forEach(function (libro) {
        tabla += `
            <tr>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.editorial}</td>
                <td>${formatearPrecio(libro.precio)}</td>
                <td class="acciones">
                    <button type="button" onclick="editarLibro(${libro.id})">Editar</button>
                    <button type="button" onclick="eliminarLibro(${libro.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    tabla += "</tbody></table>";
    contenedor.innerHTML = tabla;
}

const libroForm = document.getElementById("libroForm");

if (libroForm) {
    libroForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("libroId").value;
        const titulo = document.getElementById("tituloLibro").value.trim();
        const autor = document.getElementById("autorLibro").value.trim();
        const editorial = document.getElementById("editorialLibro").value.trim();
        const precio = Number(document.getElementById("precioLibro").value);
        const imagen = document.getElementById("imagenLibro").value.trim();
        const descripcion = document.getElementById("descripcionLibro").value.trim();
        const mensaje = document.getElementById("mensajeLibro");

        let libros = obtenerLibros();

        if (id === "") {
            const nuevoLibro = {
                id: Date.now(),
                titulo: titulo,
                autor: autor,
                editorial: editorial,
                precio: precio,
                imagen: imagen,
                descripcion: descripcion
            };

            libros.push(nuevoLibro);
            mensaje.textContent = "Libro agregado correctamente.";
        } else {
            libros.forEach(function (libro) {
                if (libro.id == id) {
                    libro.titulo = titulo;
                    libro.autor = autor;
                    libro.editorial = editorial;
                    libro.precio = precio;
                    libro.imagen = imagen;
                    libro.descripcion = descripcion;
                }
            });

            mensaje.textContent = "Libro actualizado correctamente.";
        }

        guardarLibros(libros);
        libroForm.reset();
        document.getElementById("libroId").value = "";
        mostrarLibrosAdmin();
    });
}

function editarLibro(id) {
    const libros = obtenerLibros();
    const libro = libros.find(function (item) {
        return item.id === id;
    });

    if (!libro) {
        return;
    }

    document.getElementById("libroId").value = libro.id;
    document.getElementById("tituloLibro").value = libro.titulo;
    document.getElementById("autorLibro").value = libro.autor;
    document.getElementById("editorialLibro").value = libro.editorial;
    document.getElementById("precioLibro").value = libro.precio;
    document.getElementById("imagenLibro").value = libro.imagen;
    document.getElementById("descripcionLibro").value = libro.descripcion;

    window.scrollTo(0, document.getElementById("gestionLibros").offsetTop - 70);
}

function eliminarLibro(id) {
    const confirmar = confirm("¿Desea eliminar este libro?");

    if (!confirmar) {
        return;
    }

    let libros = obtenerLibros();
    libros = libros.filter(function (libro) {
        return libro.id !== id;
    });

    guardarLibros(libros);
    mostrarLibrosAdmin();
}

const cancelarEdicion = document.getElementById("cancelarEdicion");

if (cancelarEdicion) {
    cancelarEdicion.addEventListener("click", function () {
        libroForm.reset();
        document.getElementById("libroId").value = "";
        document.getElementById("mensajeLibro").textContent = "";
    });
}

function mostrarUsuariosAdmin() {
    const contenedor = document.getElementById("listaUsuarios");

    if (!contenedor) {
        return;
    }

    const usuarios = obtenerUsuariosRegistrados();

    if (usuarios.length === 0) {
        contenedor.innerHTML = "<p>No hay usuarios registrados todavía.</p>";
        return;
    }

    let tabla = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Temáticas favoritas</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    usuarios.forEach(function (usuario, indice) {
        tabla += `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.telefono || "No registrado"}</td>
                <td>${Array.isArray(usuario.genero) ? usuario.genero.join(", ") : usuario.genero}</td>
                <td class="acciones">
                    <button type="button" onclick="eliminarUsuario(${indice})">Eliminar usuario</button>
                </td>
            </tr>
        `;
    });

    tabla += "</tbody></table>";
    contenedor.innerHTML = tabla;
}

function eliminarUsuario(indice) {
    const confirmar = confirm("¿Desea eliminar este usuario registrado?");

    if (!confirmar) {
        return;
    }

    const usuarios = obtenerUsuariosRegistrados();
    usuarios.splice(indice, 1);
    guardarUsuarios(usuarios);
    mostrarUsuariosAdmin();
}

mostrarLibrosAdmin();
mostrarUsuariosAdmin();
