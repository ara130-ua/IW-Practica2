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
