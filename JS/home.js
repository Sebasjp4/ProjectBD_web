document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // 1. ESTADO DE LA APLICACIÓN (STATE)
    // ===================================================================
    // En una aplicación real, esta sería la información que vive en tu base de datos.
    // Lo manejamos aquí como un "estado" central.

    // El usuario que está actualmente "logueado".
    const currentUser = {
        id: 1, // Los usuarios en una DB tienen un ID único
        name: 'MiUsuario',
        avatar: 'fas fa-user-circle' // Usamos una clase de Font Awesome como avatar
    };

    // Array que contendrá todas las publicaciones. Será nuestra "fuente de la verdad".
    let posts = [];

    // ===================================================================
    // 2. SIMULACIÓN DE API / BASE DE DATOS
    // ===================================================================
    // Estas funciones simulan la comunicación con un servidor. Usamos async/await
    // y setTimeout para imitar la demora de una petición de red.

    /**
     * Simula la obtención de las publicaciones iniciales desde una base de datos.
     */
    async function fetchPosts() {
        console.log('Simulando obtención de posts del servidor...');
        // Cuando tengas una DB, aquí harías: const response = await fetch('/api/posts');
        // y luego: posts = await response.json();
        
        // Datos de ejemplo
        const initialPosts = [
            {
                id: 101,
                authorId: 2,
                authorName: 'User 1234',
                authorAvatar: 'fas fa-user-circle',
                content: '¡Hola a todos! Este es mi primer post en esta increíble plataforma. ¡Espero conectar con mucha gente interesante!',
                likes: 120,
                isLiked: false, // Para saber si el currentUser le ha dado like
                comments: 14
            },
            {
                id: 102,
                authorId: 3,
                authorName: 'OtroUsuario',
                authorAvatar: 'fas fa-user-circle',
                content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dignissim purus, himenaeos maecenas phasellus eros ad aliquet erat malesuada.',
                likes: 88,
                isLiked: true, // Ejemplo de un post que ya le gustó al usuario
                comments: 5
            }
        ];
        
        // Simulamos una demora de red de 0.5 segundos
        await new Promise(resolve => setTimeout(resolve, 500)); 
        posts = initialPosts; // Guardamos los posts en nuestro estado
        console.log('Posts cargados.');
    }
    
    /**
     * Simula guardar una nueva publicación en la base de datos.
     * @param {string} content - El texto de la nueva publicación.
     */
    async function saveNewPost(content) {
        console.log('Simulando guardado de nuevo post en el servidor...');
        // Cuando tengas una DB, aquí harías:
        // const response = await fetch('/api/posts', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ content, authorId: currentUser.id })
        // });
        // const newPostFromServer = await response.json();
        
        const newPost = {
            id: Date.now(), // Usamos el timestamp actual como un ID único simple
            authorId: currentUser.id,
            authorName: currentUser.name,
            authorAvatar: currentUser.avatar,
            content: content,
            likes: 0,
            isLiked: false,
            comments: 0
        };

        await new Promise(resolve => setTimeout(resolve, 300));
        posts.unshift(newPost); // Añadimos el nuevo post al PRINCIPIO del array
        console.log('Post guardado.');
        return newPost;
    }

    /**
     * Simula borrar una publicación de la base de datos.
     * @param {number} postId - El ID de la publicación a borrar.
     */
    async function deletePostFromDB(postId) {
        console.log(`Simulando borrado del post ${postId} en el servidor...`);
        // Cuando tengas una DB, aquí harías:
        // await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

        await new Promise(resolve => setTimeout(resolve, 300));
        // Filtramos el array, quedándonos solo con los posts que NO tienen el id a borrar.
        posts = posts.filter(post => post.id !== postId);
        console.log('Post borrado.');
    }

    // ===================================================================
    // 3. RENDERIZADO (Dibujar en el DOM)
    // ===================================================================
    // Esta sección se encarga de tomar los datos del "Estado" y convertirlos en HTML.
    
    const postFeed = document.getElementById('post-feed');

    /**
     * Dibuja TODAS las publicaciones del array 'posts' en el contenedor #post-feed.
     */
    function renderPosts() {
        console.log('Renderizando posts...');
        // Si no hay posts, muestra un mensaje
        if (posts.length === 0) {
            postFeed.innerHTML = '<p class="no-posts-message">Aún no hay publicaciones. ¡Sé el primero!</p>';
            return;
        }

        // Convertimos cada objeto 'post' en un bloque de HTML
        postFeed.innerHTML = posts.map(post => `
            <div class="card post-card" data-id="${post.id}" data-author-id="${post.authorId}">
                <div class="post-header">
                    <div class="user-info">
                        <i class="${post.authorAvatar} profile-icon"></i>
                        <span>${post.authorName}</span>
                    </div>
                    ${post.authorId === currentUser.id ? '<i class="fas fa-ellipsis-h post-options"></i>' : ''}
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                <div class="post-footer">
                    <div class="post-stats">
                        <span class="like-button">
                            <i class="fas fa-heart ${post.isLiked ? 'liked' : ''}"></i> ${post.likes}
                        </span>
                        <span class="comment-button">
                            <i class="fas fa-comment"></i> ${post.comments}
                        </span>
                        <span><i class="fas fa-share"></i> 0</span>
                    </div>
                </div>
            </div>
        `).join(''); // .join('') une todos los bloques de HTML en un solo string
        console.log('Renderizado completo.');
    }

    // ===================================================================
    // 4. MANEJADORES DE EVENTOS (Event Handlers)
    // ===================================================================
    // Esta sección conecta las acciones del usuario con nuestra lógica.

    const publishButton = document.querySelector('.publish-button');
    const postTextarea = document.querySelector('.create-post-container textarea');
    const mainContent = document.querySelector('.main-content');

    // --- Publicar un Post ---
    publishButton.addEventListener('click', async () => {
        const content = postTextarea.value.trim();
        if (content) {
            await saveNewPost(content); // 1. Guardamos el dato (actualiza el array 'posts')
            renderPosts();              // 2. Volvemos a dibujar TODO el feed
            postTextarea.value = '';
        }
    });

    // --- Interacciones con Posts (Likes, Comentarios, Borrar) ---
    mainContent.addEventListener('click', async (event) => {
        const clickedElement = event.target;
        
        // .closest() busca el ancestro más cercano que coincida con el selector.
        const postCard = clickedElement.closest('.post-card');
        if (!postCard) return; // Si no se hizo clic dentro de un post, no hacemos nada

        const postId = parseInt(postCard.dataset.id); // Obtenemos el ID del post

        // --- Borrar un Post ---
        if (clickedElement.classList.contains('post-options')) {
            const authorId = parseInt(postCard.dataset.authorId);
            if (authorId === currentUser.id) {
                if (confirm('¿Estás seguro de que quieres borrar esta publicación?')) {
                    await deletePostFromDB(postId); // 1. Borramos el dato
                    renderPosts();                  // 2. Volvemos a dibujar
                }
            }
        }
        
        // --- Dar Like a un Post ---
        if (clickedElement.classList.contains('fa-heart')) {
            // En un futuro, esta lógica estaría en una función `toggleLike(postId)`
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.isLiked = !post.isLiked; // Invierte el estado de 'liked'
                post.isLiked ? post.likes++ : post.likes--; // Aumenta o disminuye el contador
                renderPosts(); // Vuelve a dibujar para reflejar el cambio
            }
        }
    });

    // ===================================================================
    // 5. INICIALIZACIÓN DE LA APLICACIÓN
    // ===================================================================
    async function initializeApp() {
        await fetchPosts(); // Carga los datos iniciales
        renderPosts();      // Dibuja la interfaz por primera vez
    }

    initializeApp(); // ¡Iniciamos la aplicación!
});