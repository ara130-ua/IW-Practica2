import { supabase } from '@/utils/supabase'
import { Pedido } from './pedido'

export async function obtenerCarrito(clienteId) {
  try {
    const { data, error } = await supabase
      .from('carrito')
      .select(
        `
          cantidad,
          articulo:articulo_cod (
            cod,
            nombre,
            descripcion_larga,
            precio,
            imagen
          )
        `,
      )
      .eq('cliente_id', clienteId)

    if (error) {
      throw error
    }

    // Transformamos los datos para incluir la cantidad y una imagen predeterminada
    return data.map((item) => ({
      id: item.articulo.cod,
      nombre: item.articulo.nombre,
      descripcion: item.articulo.descripcion_larga,
      precio: item.articulo.precio,
      imagen: item.articulo.imagen, // Cambia esto si tienes imágenes reales
      cantidad: item.cantidad,
    }))
  } catch (error) {
    console.error('Error al obtener el carrito:', error)
    return null
  }
}

export async function articuloEnCarrito(clienteId, articuloId) {
  try {
    const { data, error } = await supabase
      .from('carrito')
      .select('articulo_cod')
      .eq('cliente_id', clienteId)
      .eq('articulo_cod', articuloId)

    if (error && error.code !== 'PGRST116') {
      // Ignora el error si el artículo no se encuentra en el carrito
      throw error
    }

    // Si el artículo existe en el carrito, devuelve true

    console.log(data)
    if (data.length > 0) {
      return true
    }
    return false
  } catch (error) {
    console.error('Error al verificar si el artículo está en el carrito:', error.message)
    return false
  }
}

export async function agregarArticuloAlCarrito(clienteId, articuloId) {
  try {
    // Si no está en el carrito, agrégalo con cantidad 1
    const { data, error } = await supabase
      .from('carrito')
      .insert([{ cliente_id: clienteId, articulo_cod: articuloId, cantidad: 1 }])

    if (error) {
      throw new Error(`Error al agregar el artículo al carrito: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error al agregar el artículo al carrito:', error.message)
    return null
  }
}

export async function actualizarCantidad(clienteId, articuloId, cantidad) {
  try {
    // Verifica que la cantidad sea válida
    if (cantidad < 1) {
      console.warn('La cantidad debe ser al menos 1.')
      return null
    }

    // Actualiza la cantidad en la tabla carrito
    const { data, error } = await supabase
      .from('carrito')
      .update({ cantidad })
      .eq('cliente_id', clienteId)
      .eq('articulo_cod', articuloId)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al actualizar la cantidad:', error)
    return null
  }
}

export async function eliminarArticuloDelCarrito(clienteId, articuloId) {
  try {
    const { data, error } = await supabase
      .from('carrito')
      .delete()
      .eq('cliente_id', clienteId)
      .eq('articulo_cod', articuloId)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al eliminar el artículo del carrito:', error)
    return null
  }
}

export async function vaciarCarrito(clienteId) {
  try {
    const { data, error } = await supabase.from('carrito').delete().eq('cliente_id', clienteId)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error al vaciar el carrito:', error)
    return null
  }
}

export async function calcularTotalCarrito(cliente_id) {
  try {
    const { data, error } = await supabase
      .from('carrito')
      .select('articulo_cod, cantidad, articulo(precio)')
      .eq('cliente_id', cliente_id)

    if (error) throw error

    const total = data.reduce((acc, item) => {
      const precio = item.articulo.precio || 0
      return acc + precio * item.cantidad
    }, 0)

    return total
  } catch (err) {
    console.error('Error calculando el total del carrito:', err)
    throw err
  }
}

// Función para crear un pedido y sus líneas asociadas
export async function comprarCarrito(pedido) {
  try {
    // Calcular el total del carrito
    const totalCarrito = await calcularTotalCarrito(pedido.getClienteId())

    // Crear el pedido
    const { data: pedidoData, error: pedidoError } = await supabase
      .from('pedido')
      .insert({
        fecha: new Date().toISOString().split('T')[0],
        importe: totalCarrito,
        modo_entrega: pedido.getModoEntrega(),
        gastos_envio: pedido.getGastosEnvio(),
        estado: pedido.getEstado(),
        cliente_id: pedido.getClienteId(),
        tienda_id: pedido.getTiendaId(),
      })
      .select('id') //Recupera el id del pedido

    if (pedidoError) throw pedidoError

    const pedidoId = pedidoData[0].id

    // Obtener los artículos del carrito
    const { data: carritoData, error: carritoError } = await supabase
      .from('carrito')
      .select('articulo_cod, cantidad, articulo(precio)')
      .eq('cliente_id', pedido.getClienteId())

    if (carritoError) throw carritoError

    // Crear las líneas del pedido
    const lineasPedido = carritoData.map((item) => ({
      pedido_id: pedidoId,
      articulo_cod: item.articulo_cod,
      cantidad: item.cantidad,
      precio: item.articulo.precio,
    }))

    const { error: lineasError } = await supabase.from('lin_ped').insert(lineasPedido)

    if (lineasError) throw lineasError

    vaciarCarrito(pedido.getClienteId())

    return { success: true, pedidoId }
  } catch (err) {
    console.error('Error al comprar el carrito:', err)
    throw err
  }
}
