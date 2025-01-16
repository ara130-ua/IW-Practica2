//import { conexionbbdd } from '../conexionbbdd.js'
import { supabase } from '@/utils/supabase'
import { getCategoriaId } from './categorias'

export class Articulo {
  constructor(
    id,
    nombre,
    descripcion,
    descripcion_larga,
    detalles,
    modelo,
    talla,
    precio,
    descuento,
    marca_id,
    categoria_id,
    subcategoria_id,
  ) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.descripcion_larga = descripcion_larga
    this.detalles = detalles
    this.modelo = modelo
    this.talla = talla
    this.precio = precio
    this.descuento = descuento
    this.marca_id = marca_id
    this.categoria_id = categoria_id
    this.subcategoria_id = subcategoria_id
  }

  // Getters
  getId() {
    return this.id
  }

  getNombre() {
    return this.nombre
  }

  getDescripcion() {
    return this.descripcion
  }

  getDescripcionLarga() {
    return this.descripcion_larga
  }

  getDetalles() {
    return this.detalles
  }

  getModelo() {
    return this.modelo
  }

  getTalla() {
    return this.talla
  }

  getPrecio() {
    return this.precio
  }

  getDescuento() {
    return this.descuento
  }

  getMarcaId() {
    return this.marca_id
  }

  getCategoriaId() {
    return this.categoria_id
  }

  getSubcategoriaId() {
    return this.subcategoria_id
  }

  setId(id) {
    this.id = id
  }

  setNombre(nombre) {
    this.nombre = nombre
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion
  }

  setDescripcionLarga(descripcion_larga) {
    this.descripcion_larga = descripcion_larga
  }

  setDetalles(detalles) {
    this.detalles = detalles
  }

  setModelo(modelo) {
    this.modelo = modelo
  }

  setTalla(talla) {
    this.talla = talla
  }

  setPrecio(precio) {
    this.precio = precio
  }

  setDescuento(descuento) {
    this.descuento = descuento
  }

  setMarcaId(marca_id) {
    this.marca_id = marca_id
  }

  setCategoriaId(categoria_id) {
    this.categoria_id = categoria_id
  }

  setSubcategoriaId(subcategoria_id) {
    this.subcategoria_id = subcategoria_id
  }
}

// Información de los artículos, cada artículo tiene id, nombre, descripción, precio, stock
export async function obtenerArticulosCategoria() {
  try {
    const { data, error } = await supabase
      .from('articulo')
      .select(
        `
        cod,
        nombre,
        descripcion_corta,
        modelo,
        talla,
        precio,
        categoria:categoria_id (nombre)
      `,
      )
      .limit(50)

    if (error) {
      throw error
    } else {
      return data.map((articulo) => ({
        id: articulo.cod,
        nombre: articulo.nombre,
        price: articulo.precio,
        modelo: articulo.modelo,
        imagen: 'https://via.placeholder.com/150',
        descripcion_corta: articulo.descripcion_corta,
        talla: articulo.talla,
        categoria: articulo.categoria?.nombre || 'Sin categoría',
      }))
    }
  } catch (error) {
    console.error('Error al obtener los artículos:', error)
    return null
  }
}

// Información de los artículos, cada artículo tiene id, nombre, descripción, precio, stock
export async function obtenerArticulos() {
  try {
    const { data, error } = await supabase.from('articulo').select('*').limit(50)

    if (error) {
      throw error
    } else {
      return data.map((articulo) => ({
        id: articulo.cod,
        nombre: articulo.nombre,
        price: articulo.precio,
        modelo: articulo.modelo,
        imagen: 'https://via.placeholder.com/150',
        descripcion_corta: articulo.descripcion_corta,
        talla: articulo.talla,
      }))
    }
  } catch (error) {
    return null
  }
}

export async function getArticuloById(id) {
  try {
    const { data, error } = await supabase.from('articulo').select('*').eq('cod', id)

    if (error) {
      throw error
    } else {
      return new Articulo(
        data[0].cod,
        data[0].nombre,
        data[0].descripcion_corta,
        data[0].descripcion_larga,
        data[0].detalles,
        data[0].modelo,
        data[0].talla,
        data[0].precio,
        data[0].descuento,
        data[0].marca_id,
        data[0].categoria_id,
        data[0].subcategoria_id,
      )
    }
  } catch (error) {
    return null
  }
}

export async function actualizarArticulo(id, nombre, categoria, precio) {
  const categoria_id = await getCategoriaId(categoria)
  try {
    const { data, error } = await supabase
      .from('articulo')
      .update({
        nombre: nombre,
        categoria_id: categoria_id,
        precio: precio,
      })
      .eq('cod', id)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al actualizar el artículo:', error)
    return null
  }
}

export async function eliminarArticulo(id) {
  try {
    const { data, error } = await supabase.from('articulo').delete().eq('cod', id)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al eliminar el artículo:', error)
    return null
  }
}

export async function addArticulo({
  nombre,
  categoria_id,
  precio,
  descripcion_corta = null,
  talla = null,
  modelo = null,
}) {
  try {
    const { data, error } = await supabase.from('articulo').insert([
      {
        nombre: nombre,
        categoria_id: categoria_id,
        precio: precio,
        descripcion_corta: descripcion_corta,
        talla: talla,
        modelo: modelo,
      },
    ])

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al añadir el artículo:', error)
    return null
  }
}

export async function comprarArticulo(cliente_id, articulo_cod, cantidad, modo_entrega, tienda_id, estado) {
  try {
      // Obtener datos del artículo
      const { data: articuloData, error: articuloError } = await supabase
          .from('articulo')
          .select('precio')
          .eq('cod', articulo_cod)
          .single();

      if (articuloError) 
        throw articuloError;

      const precio = articuloData.precio;
      const importe = precio * cantidad;

      // Crear el pedido
      const { data: pedidoData, error: pedidoError } = await supabase
          .from('pedido')
          .insert({
              fecha: new Date().toISOString().split('T')[0],
              importe: importe,
              modo_entrega: modo_entrega, // Puedes ajustarlo según sea necesario
              gastos_envio: 5, // Esto hay que ajustarlo
              estado: estado,
              cliente_id: cliente_id,
              tienda_id: tienda_id, // Ajustar según la lógica de negocio
          })
          .select('id');

      if (pedidoError) throw pedidoError;

      const pedidoId = pedidoData[0].id;

      // Crear la línea del pedido
      const { error: lineaError } = await supabase
          .from('lin_ped')
          .insert({
              pedido_id: pedidoId,
              articulo_cod: articulo_cod,
              cantidad: cantidad,
              precio: precio,
          });

      if (lineaError) 
        throw lineaError;

      return { success: true, pedidoId };
  } catch (err) {
      console.error('Error al comprar el artículo:', err);
      throw err;
  }
}
/*
//crearArticulo() referencia, nombre, descripcion-corta, descripcion-larga, detalles, modelo, talla, precio, descuento, marca_id, categoria_id, subcategoria_id
export async function crearArticulo(articulo) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'INSERT INTO articulo (referencia, nombre, descripcion_corta, descripcion_larga, detalles, modelo, talla, precio, descuento, marca_id, categoria_id, subcategoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        articulo.referencia,
        articulo.nombre,
        articulo.descripcion,
        articulo.descripcion_larga,
        articulo.detalles,
        articulo.modelo,
        articulo.talla,
        articulo.precio,
        articulo.descuento,
        articulo.marca_id,
        articulo.categoria_id,
        articulo.subcategoria_id,
      ],
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      },
    )
  })
}

//eliminarArticulo()
export async function eliminarArticulo(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('DELETE FROM articulo WHERE id = ?', [id], function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//modificarArticulo()
export async function modificarArticulo(articulo) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'UPDATE articulo SET referencia = ?, nombre = ?, descripcion_corta = ?, descripcion_larga = ?, detalles = ?, modelo = ?, talla = ?, precio = ?, descuento = ?, marca_id = ?, categoria_id = ?, subcategoria_id = ? WHERE id = ?',
      [
        articulo.referencia,
        articulo.nombre,
        articulo.descripcion,
        articulo.descripcion_larga,
        articulo.detalles,
        articulo.modelo,
        articulo.talla,
        articulo.precio,
        articulo.descuento,
        articulo.marca_id,
        articulo.categoria_id,
        articulo.subcategoria_id,
        articulo.id,
      ],
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      },
    )
  })
}

//verArticulos()
export async function verArticulos() {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('SELECT * FROM articulo', function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//verArticulo()
export async function verArticulo(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('SELECT * FROM articulo WHERE id = ?', [id], function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//verArticulosPorCategoria()
export async function verArticulosPorCategoria(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM articulo WHERE categoria_id = ?',
      [id],
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      },
    )
  })
}

//verArticulosPorSubCategoria()
export async function verArticulosPorSubCategoria(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM articulo WHERE subcategoria_id = ?',
      [id],
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      },
    )
  })
}

//verArticulosPorMarca()
export async function verArticulosPorMarca(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM articulo WHERE marca_id = ?',
      [id],
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      },
    )
  })
}

//ver Articulos que tengan un descuento
export async function verArticulosConDescuento() {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('SELECT * FROM articulo WHERE descuento > 0', function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//verArticulosPorPrecio de menor a mayor
export async function verArticulosPorPrecio() {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('SELECT * FROM articulo ORDER BY precio ASC', function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//verArticulos por precio de mayor a menor
export async function verArticulosPorPrecioDesc() {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('SELECT * FROM articulo ORDER BY precio DESC', function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//filtrar articulos por talla XS, S, M, L, XL
export async function verArticulosPorTalla(talla) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM articulo WHERE talla = ?',
      [talla],
      function (error, results) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      },
    )
  })
}*/
