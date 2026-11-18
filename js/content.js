/* ==========================================================================
   NEOVIBEZ MUSIC — CONTENIDO EDITABLE
   --------------------------------------------------------------------------
   Todo lo que cambia a menudo (canciones, fotos, vídeos, redes, cifras)
   está aquí. Edita los valores entre comillas y guarda. Nada más.

   · Fotos  → mételas en  assets/img/      (jpg / webp)
   · Covers → mételas en  assets/img/covers/
   · Audio  → mételo en   assets/audio/    (mp3)
   · Vídeo  → mételo en   assets/video/    (mp4) o usa el ID de YouTube

   Si un archivo todavía no existe, la web muestra un placeholder de color,
   así que puedes ir subiendo cosas poco a poco sin que se rompa nada.
   ========================================================================== */

window.NEOVIBEZ = {

  /* ---------- Contacto y redes ---------- */
  email: "hola@neovibezmusic.com",

  socials: [
    { name: "Instagram", url: "#" },
    { name: "Spotify",   url: "#" },
    { name: "YouTube",   url: "#" },
    { name: "TikTok",    url: "#" }
  ],

  /* ---------- Portada ---------- */
  // Vídeo de fondo en la portada (opcional). Ej: "assets/video/hero.mp4"
  // Recomendado: 10-20 s, sin sonido, 1080p, menos de 8 MB.
  heroVideo: "",

  /* ---------- Cinta de géneros ---------- */
  marquee: ["Pop", "Urbano", "R&B", "Electrónica", "Reggaetón", "Indie", "Sync", "Toplines"],

  /* ---------- Cifras (CAMBIA estos números por los reales) ---------- */
  stats: [
    { value: 120, suffix: "+", label: "Canciones compuestas" },
    { value: 35,  suffix: "+", label: "Lanzamientos" },
    { value: 10,  suffix: "M", label: "Streams acumulados" },
    { value: 2,   suffix: "",  label: "Mentes, un sonido" }
  ],

  /* ---------- Catálogo ----------
     title    → nombre de la canción
     artist   → intérprete / créditos
     genre    → se usa para los filtros (se crean solos)
     bpm, key → opcionales
     duration → "m:ss"
     cover    → imagen cuadrada (mín. 600×600)
     audio    → mp3. Si lo dejas vacío "", el reproductor funciona en modo
                vista previa (sin sonido) para que veas el diseño.
     link     → enlace externo opcional (Spotify, YouTube…)            */
  tracks: [
    { title: "Medianoche",       artist: "Demo · Soby × Nanther", genre: "Pop",         bpm: 118, key: "Am",  duration: "3:12", cover: "assets/img/covers/01.jpg", audio: "", link: "" },
    { title: "Luces de Neón",    artist: "Demo · Soby × Nanther", genre: "Urbano",      bpm: 96,  key: "F#m", duration: "2:48", cover: "assets/img/covers/02.jpg", audio: "", link: "" },
    { title: "Contigo o Sin Ti", artist: "Demo · Soby × Nanther", genre: "R&B",         bpm: 84,  key: "Dm",  duration: "3:31", cover: "assets/img/covers/03.jpg", audio: "", link: "" },
    { title: "Vértigo",          artist: "Demo · Soby × Nanther", genre: "Electrónica", bpm: 126, key: "Gm",  duration: "3:05", cover: "assets/img/covers/04.jpg", audio: "", link: "" },
    { title: "Fuego Lento",      artist: "Demo · Soby × Nanther", genre: "Urbano",      bpm: 92,  key: "Cm",  duration: "2:56", cover: "assets/img/covers/05.jpg", audio: "", link: "" },
    { title: "Polaroid",         artist: "Demo · Soby × Nanther", genre: "Indie",       bpm: 104, key: "E",   duration: "3:22", cover: "assets/img/covers/06.jpg", audio: "", link: "" },
    { title: "Otra Vida",        artist: "Demo · Soby × Nanther", genre: "Pop",         bpm: 122, key: "Bm",  duration: "3:08", cover: "assets/img/covers/07.jpg", audio: "", link: "" },
    { title: "Insomnio",         artist: "Demo · Soby × Nanther", genre: "R&B",         bpm: 78,  key: "Em",  duration: "3:40", cover: "assets/img/covers/08.jpg", audio: "", link: "" }
  ],

  /* ---------- El dúo ---------- */
  duo: [
    {
      name: "Soby",
      role: "Compositor · Productor",
      bio: "Escribe aquí la bio de Soby: de dónde viene, qué le mueve, con quién ha trabajado y cuál es su sello dentro de NeoVibez.",
      photo: "assets/img/soby.jpg",
      links: [{ name: "Instagram", url: "#" }, { name: "Spotify", url: "#" }]
    },
    {
      name: "Nanther",
      role: "Compositor · Productor",
      bio: "Escribe aquí la bio de Nanther: su recorrido, sus influencias, sus créditos y lo que aporta al sonido del dúo.",
      photo: "assets/img/nanther.jpg",
      links: [{ name: "Instagram", url: "#" }, { name: "Spotify", url: "#" }]
    }
  ],

  /* ---------- Fotos del studio (7 fotos = mosaico perfecto) ---------- */
  gallery: [
    { src: "assets/img/studio-01.jpg", caption: "Sesión de composición" },
    { src: "assets/img/studio-02.jpg", caption: "Sala de control" },
    { src: "assets/img/studio-03.jpg", caption: "Grabando voces" },
    { src: "assets/img/studio-04.jpg", caption: "Sintes" },
    { src: "assets/img/studio-05.jpg", caption: "Detalles" },
    { src: "assets/img/studio-06.jpg", caption: "Noche de mezcla" },
    { src: "assets/img/studio-07.jpg", caption: "El equipo" }
  ],

  /* ---------- Vídeos ----------
     El primero es el showreel grande. Usa UNO de los dos:
     youtube → solo el ID (lo que va después de "v=" en la URL)
     file    → mp4 propio, ej: "assets/video/showreel.mp4"            */
  videos: [
    { title: "Showreel 2026",          meta: "NeoVibez Music",   youtube: "", file: "", poster: "assets/img/video-01.jpg" },
    { title: "En el studio",           meta: "Behind the scenes", youtube: "", file: "", poster: "assets/img/video-02.jpg" },
    { title: "Cómo nace una canción",  meta: "Proceso creativo",  youtube: "", file: "", poster: "assets/img/video-03.jpg" },
    { title: "Sesión en directo",      meta: "Live session",      youtube: "", file: "", poster: "assets/img/video-04.jpg" }
  ],

  /* ---------- Servicios ---------- */
  services: [
    { title: "Composición",        text: "Canciones a medida y toplines: melodía, letra y concepto para artistas y sellos.", tags: ["Songwriting", "Toplines"] },
    { title: "Producción",         text: "Del boceto al máster. Sonido actual, con identidad y listo para publicar.",        tags: ["Beats", "Arreglos"] },
    { title: "Sync & licencias",   text: "Música para publicidad, cine, series y videojuegos. Catálogo listo para licenciar.", tags: ["Publicidad", "Audiovisual"] },
    { title: "Sesiones de studio", text: "Co-writes, camps y sesiones con artistas. Ven con una idea, sal con una canción.",    tags: ["Co-write", "Camps"] }
  ]
};
