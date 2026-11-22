const local = (n: number) => `lugares/lugar-${n}.jpg`;

export const poisSeed = [
  { name: "Parque Vecinal El Pinar de Suba", category: "Parque", description: "Parque vecinal con zonas verdes, juegos y espacios para recreación y encuentro comunitario.", address: "Kr. 94 # 150-20, El Pinar de Suba, Suba, Bogotá", imageUrl: local(1), latitude: 4.7498, longitude: -74.0882 },
  { name: "Colegio Distrital El Pinar de Suba (IED)", category: "Educación", description: "Institución educativa distrital que atiende a niños y jóvenes del barrio con formación básica y media.", address: "Cl. 151C # 92-35, El Pinar de Suba, Suba, Bogotá", imageUrl: local(2), latitude: 4.7506, longitude: -74.0870 },
  { name: "Salón Comunal JAC El Pinar de Suba", category: "Comunidad", description: "Espacio comunitario para reuniones vecinales, actividades sociales y gestión de la JAC del barrio.", address: "Kr. 95 # 150-45, El Pinar de Suba, Suba, Bogotá", imageUrl: local(3), latitude: 4.7495, longitude: -74.0892 },
  { name: "Eje Comercial Calle 151 - Pinar de Suba", category: "Comercio", description: "Tramo comercial del barrio con tiendas de barrio, servicios y dinámica local sobre la Calle 151.", address: "Cl. 151 con Kr. 95, El Pinar de Suba, Suba, Bogotá", imageUrl: local(4), latitude: 4.7503, longitude: -74.0895 },
  { name: "Paradero Alimentador 11-4 Pinar de Suba", category: "Transporte", description: "Punto de conexión con rutas alimentadoras del sistema TransMilenio/SITP para el barrio.", address: "Kr. 92 con Cl. 151, El Pinar de Suba, Suba, Bogotá", imageUrl: local(5), latitude: 4.7492, longitude: -74.0865 },
  { name: "Parque Lineal y Zona Verde Calle 148", category: "Parque", description: "Franja verde y sendero peatonal para caminatas, descanso y actividad física en el barrio.", address: "Cl. 148 con Kr. 96, El Pinar de Suba, Suba, Bogotá", imageUrl: local(6), latitude: 4.7482, longitude: -74.0905 },
];
