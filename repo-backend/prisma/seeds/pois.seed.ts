const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=900`;

export const poisSeed = [
  { name: "Parque Vecinal Pinar de Suba", category: "Parque", description: "Espacio verde y recreativo del barrio El Pinar, en la Localidad de Suba.", imageUrl: commons("Parque Áticos Suba Btá.jpeg"), latitude: 4.5369, longitude: -74.0883 },
  { name: "Humedal Tibabuyes Juan Amarillo - Acceso Suba", category: "Parque", description: "Ecosistema protegido cercano, ideal para senderismo y avistamiento.", imageUrl: commons("Laguna Tibabuyes de Bogotá, Cund - Col.jpg"), latitude: 4.7448, longitude: -74.1035 },
  { name: "Parque La Gaitana", category: "Parque", description: "Parque barrial de referencia en el entorno de Suba con zonas deportivas.", imageUrl: commons("Parque infantil San José Suba Btá.jpg"), latitude: 4.7406, longitude: -74.1086 },
  { name: "IED Pinar de Suba", category: "Colegio", description: "Institución educativa distrital del barrio Pinar de Suba.", imageUrl: commons("Colegio San Jorge - panoramio.jpg"), latitude: 4.5365, longitude: -74.0878 },
  { name: "Colegio Distrital Antonio Nariño - Entorno Pinar", category: "Colegio", description: "Colegio del sector con formación básica y media para la comunidad.", imageUrl: commons("Colegio San Jorge - panoramio - javier rivera p (1).jpg"), latitude: 4.5392, longitude: -74.0895 },
  { name: "IED Gerardo Paredes", category: "Colegio", description: "Institución educativa distrital de la localidad de Suba.", imageUrl: commons("Colegio San Jorge De Inglaterra - panoramio.jpg"), latitude: 4.7395, longitude: -74.0835 },
  { name: "Jardín Infantil y Centro Comunitario Pinar de Suba", category: "Colegio", description: "Espacio de atención y formación inicial para primera infancia del barrio.", imageUrl: commons("Asamblea Mesa Local de Artistas Plásticos y Visuales de Suba.jpg"), latitude: 4.5358, longitude: -74.0869 },
  { name: "Plaza Imperial Centro Comercial", category: "Comercio", description: "Centro comercial cercano con comercio, servicios y entretenimiento.", imageUrl: commons("CC Plaza Imperial Bogotá.jpg"), latitude: 4.7435, longitude: -74.0948 },
  { name: "Portal de Suba - TransMilenio", category: "Transporte", description: "Terminal del sistema TransMilenio con conexión a rutas alimentadoras.", imageUrl: commons("Portal Suba de Bogotá, Cund - Colombia.jpg"), latitude: 4.7464, longitude: -74.0947 },
  { name: "Paradero SITP Av. Suba con Calle 145", category: "Transporte", description: "Paradero de rutas SITP y alimentadoras sobre el eje Av. Suba/Calle 145.", imageUrl: commons("Av. Suba Btá .jpg"), latitude: 4.7512, longitude: -74.0905 },
  { name: "Paradero SITP Av. Suba con Calle 139", category: "Transporte", description: "Punto de acceso al SITP en la Av. Suba hacia el sector de Pinar.", imageUrl: commons("Av Suba en Btá.jpg"), latitude: 4.7422, longitude: -74.0938 },
  { name: "Hospital de Suba", category: "Salud", description: "Centro hospitalario de referencia para atención en la localidad.", imageUrl: commons("Clinica Jorge Piñeros Suba, Bogotá.jpg"), latitude: 4.7532, longitude: -74.0928 },
  { name: "SuperCADE Suba", category: "Servicios", description: "Punto de atención de trámites y servicios distritales en Suba.", imageUrl: commons("Super cade portal Suba Bog.jpg"), latitude: 4.7410, longitude: -74.0842 },
];
