// Mostrar y ocultar formularios
document.getElementById('showSignupFormButton').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('showSignupFormButton').style.display = 'none';
    document.getElementById('showLoginFormButton').style.display = 'none';
});

document.getElementById('backSignupButton').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('showSignupFormButton').style.display = 'block';
    document.getElementById('showLoginFormButton').style.display = 'block';
});

document.getElementById('showLoginFormButton').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('showSignupFormButton').style.display = 'none';
    document.getElementById('showLoginFormButton').style.display = 'none';
});

document.getElementById('backLoginButton').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('showSignupFormButton').style.display = 'block';
    document.getElementById('showLoginFormButton').style.display = 'block';
});

// Crear cuenta
document.getElementById('signupFormElement').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        const modal = document.getElementById('successModal');
        if (data.success) {
            document.getElementById('modalMessage').innerText = 'Cuenta creada con éxito';
        } else {
            document.getElementById('modalMessage').innerText = data.message || 'Error al crear la cuenta';
        }
        modal.style.display = 'block';

        document.getElementById('acceptButton').onclick = function() {
            modal.style.display = 'none';
        };

        document.getElementsByClassName('close')[0].onclick = function() {
            modal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Iniciar sesión
document.getElementById('loginFormElement').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        const modal = document.getElementById('successModal');
        if (data.success) {
            document.getElementById('modalMessage').innerText = 'Inicio de sesión exitoso';
        } else {
            document.getElementById('modalMessage').innerText = data.message || 'Error al iniciar sesión';
        }
        modal.style.display = 'block';

        document.getElementById('acceptButton').onclick = function() {
            modal.style.display = 'none';
        };

        document.getElementsByClassName('close')[0].onclick = function() {
            modal.style.display = 'none';
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Función para agregar un libro
function addLibro() {
    const libro = {
        id: document.getElementById('l-id').value,
        titulo: document.getElementById('t-titu').value,
        autor: document.getElementById('a-auto').value,
        editorial: document.getElementById('e-edit').value,
        anio: document.getElementById('a-anio').value,
        genero: document.getElementById('g-gen').value
    };

    fetch('/libros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Libro agregado exitosamente');
        } else {
            alert('Error al agregar el libro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para actualizar un libro
function updateLibro() {
    const libro = {
        id: document.getElementById('l-id').value,
        titulo: document.getElementById('t-titu').value,
        autor: document.getElementById('a-auto').value,
        editorial: document.getElementById('e-edit').value,
        anio: document.getElementById('a-anio').value,
        genero: document.getElementById('g-gen').value
    };

    fetch('/libros', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(libro)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Libro actualizado exitosamente');
        } else {
            alert('Error al actualizar el libro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para eliminar un libro
function deleteLibro() {
    const id = document.getElementById('l-id').value;

    fetch(`/libros/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Libro eliminado exitosamente');
        } else {
            alert('Error al eliminar el libro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para agregar una bodega
function addBodega() {
    const bodega = {
        id: document.getElementById('b-id').value,
        direccion: document.getElementById('d-direc').value,
        nombre: document.getElementById('n-nombre').value,
        detalles: document.getElementById('p-detalles').value
    };

    fetch('/bodegas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodega)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bodega agregada exitosamente');
        } else {
            alert('Error al agregar la bodega');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para actualizar una bodega
function updateBodega() {
    const bodega = {
        id: document.getElementById('b-id').value,
        direccion: document.getElementById('d-direc').value,
        nombre: document.getElementById('n-nombre').value,
        detalles: document.getElementById('p-detalles').value
    };

    fetch('/bodegas', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodega)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bodega actualizada exitosamente');
        } else {
            alert('Error al actualizar la bodega');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para eliminar una bodega
function deleteBodega() {
    const id = document.getElementById('b-id').value;

    fetch(`/bodegas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bodega eliminada exitosamente');
        } else {
            alert('Error al eliminar la bodega');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para agregar un producto
function addProducto() {
    const producto = {
        id: document.getElementById('p-id').value,
        nombre: document.getElementById('p-nombre').value,
        categoria: document.getElementById('p-categoria').value,
        bodegas: document.getElementById('p-bodegas').value,
        descripcion: document.getElementById('p-descripcion').value
    };

    fetch('/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto agregado exitosamente');
        } else {
            alert('Error al agregar el producto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para actualizar un producto
function updateProducto() {
    const producto = {
        id: document.getElementById('p-id').value,
        nombre: document.getElementById('p-nombre').value,
        categoria: document.getElementById('p-categoria').value,
        bodegas: document.getElementById('p-bodegas').value,
        descripcion: document.getElementById('p-descripcion').value
    };

    fetch('/productos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto actualizado exitosamente');
        } else {
            alert('Error al actualizar el producto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para eliminar un producto
function deleteProducto() {
    const id = document.getElementById('p-id').value;

    fetch(`/productos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto eliminado exitosamente');
        } else {
            alert('Error al eliminar el producto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
