import { supabase } from '@/utils/supabase'

export async function obtenerTiendas() {
  try {
    const { data, error } = await supabase
      .from('tienda')
      .select(
        `
          id,
          nombre
        `,
      )
      .neq('id', 1) // Excluye la tienda con id 1

    if (error) {
      throw error
    }

    return data.map((tienda) => ({
      id: tienda.id,
      nombre: tienda.nombre,
    }))
  } catch (error) {
    console.error('Error al obtener las tiendas:', error)
    return null
  }
}
