# CholloRadar

Prototipo estático responsive en español para presentar el proyecto. Todos los productos y precios son ficticios. No existen ofertas reales, históricos, compras, alertas ni acceso concedido a Comparaloo.

## Archivos
- `index.html`: catálogo, búsqueda, filtros y detalle.
- `proyecto.html`: estado real y plan de integración.
- `styles.css`, `app.js`: diseño e interacción sin dependencias.
- `data/offers.json`: seis ejemplos ficticios. La carpeta data está en la raíz de este repositorio.
- `assets/radar.svg`: marca vectorial propia.

## Publicación gratuita
En Settings → Pages, seleccionar **Deploy from a branch**, **main**, **/(root)** y Save. El repositorio debe ser público para GitHub Free.
URL prevista: https://vargasleal.github.io/cholloradar-web/
La URL solo estará operativa cuando Pages termine de desplegar. Consultar Settings → Pages y Actions.

## Desarrollo
Servir la raíz por HTTP, por ejemplo `python -m http.server 8000`, y abrir http://localhost:8000 .
No abrir index.html directamente como archivo: el navegador puede bloquear la carga JSON.
No hay compilación ni instalación de paquetes.
Comprobar las tres categorías, búsqueda con/sin tildes, combinación de filtros, orden ascendente/descendente, estado vacío, diálogo con Escape, fallo de carga JSON y navegación entre páginas, en escritorio y móvil.

## Comparaloo
Integración exclusivamente planificada. Primero solicitar y obtener permiso y documentación oficial. Después implementar el acceso en un servidor o proceso autorizado, con secretos fuera del frontend. Confirmar esquema, límites, atribución, almacenamiento e historial antes de programar endpoints concretos. Pages solo aloja archivos estáticos; no ejecuta un backend seguro.
No incorporar datos reales hasta poder acreditar origen, fecha y permisos.

## Seguridad y privacidad
No añadir tokens de Telegram, claves API, archivos .env, chat IDs ni datos personales. No hay servicios de terceros, tipografías remotas, analítica, cookies propias ni formularios. Las ilustraciones son esquemas originales sin correspondencia con productos reales.
El ignore no sustituye la revisión de archivos antes de cada publicación.
