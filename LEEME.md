# NeoVibez Music — web

Web estática (HTML + CSS + JS, sin instalaciones). Se abre con doble clic en `index.html` y se sube tal cual a cualquier hosting.

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Canciones, fotos, vídeos, redes, email, cifras, servicios, bios | `js/content.js` |
| Frases y titulares de cada sección | `index.html` (busca los comentarios `<!-- EDITA -->`) |
| Colores y tipografías | `css/styles.css`, bloque `:root` del principio |

## Archivos que la web ya está esperando

Con solo guardar los archivos con estos nombres, aparecen solos. Mientras no existan se ve un placeholder de color.

| Archivo | Uso | Tamaño recomendado |
| --- | --- | --- |
| `assets/img/soby.jpg`, `assets/img/nanther.jpg` | Retratos del dúo | vertical 4:5, ~1200×1500 |
| `assets/img/studio-01.jpg` … `studio-07.jpg` | Mosaico del studio | ~1600 px de ancho |
| `assets/img/covers/01.jpg` … `08.jpg` | Portadas del catálogo | cuadradas, 600×600 |
| `assets/img/video-01.jpg` … `video-04.jpg` | Miniaturas de los vídeos | 16:9, 1280×720 |
| `assets/img/og.jpg` | Imagen al compartir el enlace | 1200×630 |
| `assets/audio/*.mp3` | Canciones (pon la ruta en `audio:` de cada tema) | mp3 a 192–256 kbps |
| `assets/video/hero.mp4` | Vídeo de fondo de la portada (ponlo en `heroVideo`) | 10–20 s, sin sonido, < 8 MB |

Consejo: pasa las fotos por [squoosh.app](https://squoosh.app) antes de subirlas para que la web cargue rápido.

## Cosas a saber

- **Audio:** si una canción tiene `audio: ""`, el reproductor funciona en modo vista previa (sin sonido). En cuanto pongas la ruta del mp3, suena.
- **Vídeos:** en cada vídeo rellena `youtube` (solo el ID) **o** `file` (un mp4 propio).
- **Formulario:** abre el correo del visitante con el mensaje ya escrito hacia el email de `content.js`. Para recibir los mensajes directamente sin que el visitante abra su correo, hay que conectarlo a un servicio como Formspree.
- **Cifras:** los números de «Quiénes somos» son de ejemplo. Cámbialos por los reales.

## Publicarla en neovibezmusic.com

Sube la carpeta entera a un hosting estático (Netlify, Cloudflare Pages, Vercel o GitHub Pages son gratis) y apunta el dominio desde el panel donde lo compraste.
