# CholloRadar: diseño y revisión

## Versión 2: catálogo sin panel lateral

Dirección Framed sheet, semilla 1860607270. Un redibujo de shell: No sidebar.
Motivo: el usuario aprobó comparar una versión más comercial con tres categorías arriba; el lateral reservaba demasiada superficie para pocas opciones. El script de Taste seleccionó el shell sin sidebar.
Se conserva el marco verde grisáceo, la superficie blanca y el sistema tipográfico local.
La versión anterior está en .taste-skill/version-1 (copia local de comparación, excluida de Git).

Idea: el radar de CholloRadar se convierte en una selección que se acota con categorías, búsqueda y presupuesto, con el catálogo como primer destino.
La pregunta principal sigue siendo qué producto ficticio encaja con la búsqueda y el presupuesto.
No se han añadido fotografías, vídeo ni servicios externos. Se han creado cinco ilustraciones SVG locales nuevas: phone.svg, headphones.svg, vacuum.svg, robot.svg y cooker.svg. Son dibujos de productos ficticios; no se presentan como fotografías de productos reales. No requieren atribuciones externas.
Las características visibles proceden de las descripciones existentes; se guardan explícitamente en data/offers.json y la carga comprueba que cada producto tenga dos.
Los seis registros siguen siendo ejemplos; deben sustituirse por datos e imágenes autorizados antes de ofrecer productos reales.

ROUND 1 (versión 2)
Seen in one second: catálogo comercial ligero con categorías y precios de demostración.
Idea (one sentence): el radar lleva de la categoría a dos características y un precio, antes de abrir el detalle.
Live thing: selección de categoría, búsqueda sin tildes y presupuesto máximo combinado.
Layout words by section: cabecera=marca / categorías=pestañas / filtros=fila / productos=cuadrícula / contexto=banda informativa.
Scores: design 8.0 · usability 8.2 · creativity 6.8 · content 8.0 → overall 7.8
Caps applied: recorrido app; sin suelo de fotografías ni entradas animadas.
Top three problems remaining:
1. Las imágenes siguen siendo ilustraciones, no fotos reales; necesitan sustitución si se incorporan ofertas verificadas.
2. La categoría final queda fuera del primer ancho móvil; la fila permite desplazamiento táctil y navegación con teclado, con la categoría siguiente parcialmente visible.
3. Los seis registros no permiten valorar búsquedas extensas o comparar comercios reales.

Comprobaciones: 16 pruebas funcionales, incluyendo dos características por ficha, ilustraciones cargadas, indicador del presupuesto y cierre del desplegable con Escape y retorno del foco. Se mantienen el resto de comprobaciones de la versión anterior.
Inspector en ambas rutas a 1440, 768 y 390px; sin excepciones. El lint permite la sombra del desplegable porque es una superficie flotante real, no un panel en reposo.
La puntuación es una autoevaluación visual, no una auditoría independiente de SEO, WCAG o rendimiento.

## Registro de la primera versión

## Dirección

Taste Skill, recorrido de app: catálogo con filtros, no landing de marketing.
Estilo elegido: Framed sheet. Semilla: 1860607270.
Sin redibujos. Se conservan la tipografía del sistema, la marca verde y el stack HTML/CSS/JavaScript.
Se eligió frente a Achromatic ledger porque el marco reúne los filtros y separa el área de exploración sin convertir el catálogo en un informe financiero.

La identidad se expresa con el marco gris verdoso, la marca radar original y el verde en los precios.
Idea: el radar de CholloRadar se convierte en un catálogo que acota productos por categoría y presupuesto, sin inventar descuentos.
Elemento interactivo: búsqueda, categoría y presupuesto máximo combinados; los contadores proceden del mismo conjunto de productos filtrados.

## Inventario y preguntas

- Marca CholloRadar y símbolo de radar propio.
- Público de habla española; moneda EUR.
- Prototipo independiente, sin ofertas verificadas.
- Seis productos ficticios conservados del catálogo original.
- Dos ejemplos de tecnología, dos de aspiradoras y dos de robots de cocina.
- Precios de 69,00 a 299,00 euros; no hay precio anterior ni ahorro demostrable.
- Nombres propios: Horizonte, Nube, Brisa, Órbita, Sabor y Mesa.
- Búsqueda local con normalización de tildes.
- Sin comercios asociados, compras, históricos ni alertas.
- Comparaloo es un plan pendiente de autorización.

Pregunta principal: ¿qué productos de demostración encajan con mi búsqueda y presupuesto?
Detalle: ¿qué representa este ejemplo y qué datos faltan?
Información: ¿qué funciona hoy y qué está pendiente?

## Composición y contenido

Catálogo primero; controles visibles en escritorio y filtros plegables en tablet y móvil.
La ficha muestra ilustración, categoría, nombre, descripción, precio ficticio y detalle.
El detalle usa un diálogo nativo con foco inicial en cerrar y cierre con Escape.
Los fallos de carga se muestran dentro del catálogo y permiten reintentar.
La página del proyecto conserva el plan y las limitaciones del producto.

No se han utilizado fotografías, vídeo, fuentes remotas ni imágenes de terceros.
Las cinco ilustraciones SVG existentes (móvil, auriculares, aspiradora, robot aspirador y robot de cocina) se reutilizan como dibujos de demostración, no como fotografías.
No hay créditos externos que incorporar.
Antes de ofrecer productos reales hay que sustituir los seis registros de data/offers.json por datos autorizados y verificables.
La skill de Vercel no se ha aplicado: este proyecto no utiliza React ni Next.js.

## Revisión visual

Antes: inspector de Taste a 1440, 768 y 390px: 4 FAIL y 1 WARN.
Problemas: texto bajo 11px, etiquetas en mayúsculas espaciadas, gradientes decorativos y titular de tres líneas en móvil.
Después: ambas páginas a 1440, 768 y 390px: 0 FAIL y 0 WARN.
No se han permitido excepciones al inspector.

ROUND 1
Seen in one second: catálogo de tecnología y hogar con productos de demostración y precio legible.
Idea (one sentence): el radar reduce el catálogo a lo que encaja en una búsqueda y presupuesto.
Live thing: filtros combinados y recuentos calculados.
Layout words by section: marco=filtros / catálogo=cuadrícula de productos / contexto=banda informativa / proyecto=lectura en columna.
Scores: design 7.0 · usability 7.5 · creativity 6.0 · content 7.5 → overall 7.0
Caps applied: recorrido app; no suelo de fotografías ni animación de landing.
Top three problems:
1. after/mobile-fold.jpg: demasiada altura antes del primer producto; acortar título y reunir encabezado y contador.
2. after/desktop-fold.jpg: hueco bajo títulos de una línea; eliminar altura mínima.
3. project/desktop-page-01.jpg: columna de lectura con una franja lateral vacía demasiado ancha; estrechar la superficie y reducir separación final.

ROUND 2 (final)
Seen in one second: productos y precios de un catálogo de demostración; búsqueda como acción principal.
Idea (one sentence): el radar de CholloRadar delimita por categoría y presupuesto antes de abrir cada detalle.
Live thing: búsqueda sin distinción de tildes, categoría y presupuesto; cada recuento sigue los filtros.
Layout words by section: marco=filtros / catálogo=productos / contexto=aviso breve / proyecto=columna de lectura.
Scores: design 7.5 · usability 8.0 · creativity 6.5 · content 8.0 → overall 7.6
Caps applied: recorrido app; sin requisitos de fotografía o entradas animadas de landing.
Top three problems remaining:
1. Las ilustraciones son esquemas de demo, no imágenes de productos reales; reemplazarlas cuando existan productos autorizados.
2. El catálogo conserva seis objetos ficticios y no permite validar la experiencia con cientos de resultados.
3. La identidad es coherente pero deliberadamente funcional; no equivale a una dirección de marca completa.

Comprobaciones visuales específicas de app:
1. El catálogo responde a la pregunta principal; precios y nombres preceden al detalle.
2. Las filas y los extremos de las fichas comparten los bordes de la superficie.
3. El marco queda neutro; el verde identifica marca y precios; no hay deltas de ahorro inventados.
4. Recuentos calculados de los productos, precios con dos decimales y cifras tabulares; no hay sumas o históricos simulados.
5. Cero presupuesto muestra cero productos; las cargas fallidas muestran datos no disponibles.
6. No hay gráficos ni leyendas que puedan inventar magnitudes.
7. En móvil, los filtros se pliegan y el primer producto empieza antes del 60% de la altura de 844px.

Las puntuaciones son una valoración del propio autor, no una evaluación independiente.

## Verificación funcional

14 comprobaciones de navegador: carga de seis productos y recuentos; las tres categorías; búsqueda con tildes y filtros combinados; presupuesto y cero; orden ascendente y descendente; diálogo, Escape y retorno del foco; anchuras de 320, 390, 768, 1024 y 1440px sin desbordamiento; filtros por teclado; fallo de datos y recuperación; ruta informativa y enlaces locales; ausencia de excepciones JavaScript; movimiento reducido y posición inicial del catálogo móvil.

Además: sintaxis JavaScript, lint de Taste y revisión visual de las capturas de ambas páginas.
No se han ejecutado Lighthouse, una auditoría WCAG completa ni pruebas con lector de pantalla. No se atribuyen puntuaciones de rendimiento o SEO no medidas.
Se conservan título, descripción, idioma, estructura semántica y recursos locales sin dependencias adicionales.
