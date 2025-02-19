import { supabase } from '@/utils/supabase'

export class Pedido {
  constructor(id, fecha, importe, modo_entrega, gastos_envio, estado, cliente_id, tienda_id) {
    this.id = id
    this.fecha = fecha
    this.importe = importe
    this.modo_entrega = modo_entrega
    this.gastos_envio = gastos_envio
    this.estado = estado
    this.cliente_id = cliente_id
    this.tienda_id = tienda_id
  }

  // Getters
  getId() {
    return this.id
  }

  getFecha() {
    return this.fecha
  }

  getImporte() {
    return this.importe
  }

  getModoEntrega() {
    return this.modo_entrega
  }

  getGastosEnvio() {
    return this.gastos_envio
  }

  getEstado() {
    return this.estado
  }

  getClienteId() {
    return this.cliente_id
  }

  getTiendaId() {
    return this.tienda_id
  }

  // Setters
  setId(id) {
    this.id = id
  }

  setFecha(fecha) {
    this.fecha = fecha
  }

  setImporte(importe) {
    this.importe = importe
  }

  setModoEntrega(modo_entrega) {
    this.modo_entrega = modo_entrega
  }

  setGastosEnvio(gastos_envio) {
    this.gastos_envio = gastos_envio
  }

  setEstado(estado) {
    this.estado = estado
  }

  setClienteId(cliente_id) {
    this.cliente_id = cliente_id
  }

  setTiendaId(tienda_id) {
    this.tienda_id = tienda_id
  }
}

export async function getPedidos() {
  const { data, error } = await supabase.from('pedido').select(`
    id, 
    fecha, 
    importe, 
    modo_entrega, 
    gastos_envio, 
    estado,
    cliente:cliente_id (email)
  `)

  if (error) {
    throw new Error(error.message)
  }

  return data.map(
    (pedido) =>
      new Pedido(
        pedido.id,
        pedido.fecha,
        pedido.importe,
        pedido.modo_entrega,
        pedido.gastos_envio,
        pedido.estado,
        pedido.cliente.email,
        pedido.tienda_id,
      ),
  )
}

export async function updateEstadoPedido(pedido_id, estado) {
  const { data, error } = await supabase.from('pedido').update({ estado }).match({ id: pedido_id })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function fetchArticuloNombreYCantidad(pedidoId) {
  const { data, error } = await supabase.rpc('execute_sql', {
    sql_query: `
        SELECT 
          a.cod AS id,
          a.nombre AS articulo_nombre,
          lp.cantidad
        FROM 
          public.lin_ped lp
        JOIN 
          public.articulo a ON lp.articulo_cod = a.cod
        WHERE 
          lp.pedido_id = ${pedidoId};
      `,
  })

  if (error) {
    console.error('Error fetching data:', error)
    return []
  }
  console.log('data:', data)
  return data.map((row) => ({
    id: row.id,
    articulo_nombre: row.articulo_nombre,
    cantidad: row.cantidad,
  }))
}

export async function obtenerPedidosPorCliente(clienteId) {
  try {
    const { data, error } = await supabase
      .from('pedido')
      .select(
        `
        id,
        fecha,
        importe,
        estado
      `,
      )
      .eq('cliente_id', clienteId) // Filtra por el cliente_id proporcionado

    if (error) {
      throw error
    }

    return data.map((pedido) => ({
      id: pedido.id,
      fecha: pedido.fecha,
      importe: pedido.importe,
      estado: pedido.estado,
    }))
  } catch (error) {
    console.error('Error al obtener los pedidos del cliente:', error)
    return null
  }
}

export async function obtenerDetallesPedido(pedidoId) {
  try {
    const { data, error } = await supabase
      .from('lin_ped')
      .select(
        `
        cantidad,
        articulo:articulo_cod (nombre, precio)
      `,
      )
      .eq('pedido_id', pedidoId) // Filtra por el id del pedido

    if (error) {
      throw error
    }

    return data.map((linea) => ({
      nombre: linea.articulo?.nombre || 'Artículo desconocido',
      cantidad: linea.cantidad,
      precio: linea.articulo?.precio || 0, // Precio de cada artículo
    }))
  } catch (error) {
    console.error('Error al obtener los detalles del pedido:', error)
    return null
  }
}
