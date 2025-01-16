import { supabase } from '@/utils/supabase'

export async function obtenerListaDeseos(clienteId) {
  try {
    const { data, error } = await supabase
      .from('lista_deseos')
      .select(
        `
          articulo:articulo_cod (
            cod,
            nombre,
            descripcion_larga,
            precio
          )
        `,
      )
      .eq('cliente_id', clienteId)

    if (error) {
      throw error
    }

    // Transformamos los datos para incluir un campo de imagen
    return data.map((deseo) => ({
      id: deseo.articulo.cod,
      nombre: deseo.articulo.nombre,
      descripcion: deseo.articulo.descripcion_larga,
      precio: deseo.articulo.precio,
      imagen: 'https://via.placeholder.com/150', // Cambia esto si tienes imágenes reales
    }))
  } catch (error) {
    console.error('Error al obtener la lista de deseos:', error)
    return null
  }
}

export async function addListaDeDeseos(clienteId, articuloId) {
  try {
    const { data, error } = await supabase.from('lista_deseos').insert([
      {
        cliente_id: clienteId,
        articulo_cod: articuloId,
      },
    ])

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al añadir a la lista de deseos:', error)
    return null
  }
}

export async function eliminarListaDeDeseos(clienteId, articuloId) {
  try {
    const { data, error } = await supabase
      .from('lista_deseos')
      .delete()
      .eq('cliente_id', clienteId)
      .eq('articulo_cod', articuloId)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al eliminar de la lista de deseos:', error)
    return null
  }
}

// devuelve un booleano si el articulo esta en la lista de deseos en base al clienteId y articuloId
export async function estaEnListaDeDeseos(clienteId, articuloId) {
  try {
    const { data, error } = await supabase
      .from('lista_deseos')
      .select('cliente_id, articulo_cod')
      .eq('cliente_id', clienteId)
      .eq('articulo_cod', articuloId)

    if (error) {
      throw error
    }

    return data.length > 0
  } catch (error) {
    console.error('Error al comprobar si está en la lista de deseos:', error)
    return false
  }
}
