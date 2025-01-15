import articulosJson from './articulos.json'

export const articulos = Object.values(articulosJson.Articulos).map((articulo) => ({
  id: articulo.id,
  nombre: articulo.nombre,
  price: articulo.precio,
  modelo: articulo.modelo,
  imagen: 'https://via.placeholder.com/150',
  descripcion_corta: articulo.descripcion_corta,
  talla: articulo.talla,
}))
