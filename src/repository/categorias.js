import { supabase } from '@/utils/supabase'

export async function getCategorias() {
  try {
    const { data, error } = await supabase.from('categoria').select('*')
    if (error) throw error
    return data.map((categoria) => ({
      nombre: categoria.nombre,
    }))
  } catch (error) {
    console.error('Error en getCategorias:', error)
    throw error
  }
}

export async function getCategoriaId(nombre) {
  try {
    const { data, error } = await supabase.from('categoria').select('id').eq('nombre', nombre)
    if (error) throw error
    return data.id
  } catch (error) {
    console.error('Error en getCategoriaId:', error)
    throw error
  }
}

export async function obtenerCategoriasConConteo() {
  try {
    const { data, error } = await supabase.from('categoria').select(`
          id,
          nombre
        `)

    if (error) {
      throw error
    }

    return data.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
    }))
  } catch (error) {
    console.error('Error al obtener las categorías:', error)
    return null
  }
}

export async function agregarCategoria(nombre) {
  try {
    const { data, error } = await supabase
      .from('categoria') // Nombre de la tabla
      .insert([{ nombre }]) // Inserta una nueva fila con el nombre proporcionado

    if (error) {
      throw error
    }

    console.log('Categoría agregada correctamente:', data)
    return data // Devuelve la categoría añadida
  } catch (error) {
    console.error('Error al agregar la categoría:', error)
    return null
  }
}

export async function eliminarCategoriaById(id) {
  try {
    const { data, error } = await supabase.from('categoria').delete().eq('id', id)

    if (error) {
      throw error
    }

    console.log('Categoría eliminada correctamente:', data)
    return data
  } catch (error) {
    console.error('Error al eliminar la categoría:', error)
    return null
  }
}

export async function actualizarCategoriaById(id, nombre) {
  try {
    const { data, error } = await supabase.from('categoria').update({ nombre }).eq('id', id)

    if (error) {
      throw error
    }

    console.log('Categoría actualizada correctamente:', data)
    return data
  } catch (error) {
    console.error('Error al actualizar la categoría:', error)
    return null
  }
}

/*
// Gestionar categorías
export async function anadirCategoria(categoria) {
    try {
        const query = 'INSERT INTO categoria (nombre) VALUES ($1)';
        const result = await conexionbbdd.query(query, [categoria]);
        return result;
    } catch (error) {
        console.error('Error al añadir categoría:', error);
        throw error;
    }
}

// Ver productos de una categoría dado su nombre
export async function getProductByCategoryName(name) {
    try {
        const query = `SELECT * FROM articulo a
                       JOIN categoria c ON a.categoria_id = c.id
                       WHERE c.nombre = $1`;
        const result = await conexionbbdd.query(query, [name]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener productos por nombre de categoría:', error);
        throw error;
    }
}

// Ver productos de una categoría dado su ID
export async function getProductByCategoryId(id) {
    try {
        const query = 'SELECT * FROM articulo WHERE categoria_id = $1';
        const result = await conexionbbdd.query(query, [id]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener productos por ID de categoría:', error);
        throw error;
    }
}

// Eliminar categoría
export async function eliminarCategoria(id) {
    try {
        const query = 'DELETE FROM categoria WHERE id = $1';
        const result = await conexionbbdd.query(query, [id]);
        return result;
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        throw error;
    }
}

// Modificar categoría
export async function modificarCategoria(id, categoria) {
    try {
        const query = 'UPDATE categoria SET nombre = $1 WHERE id = $2';
        const result = await conexionbbdd.query(query, [categoria, id]);
        return result;
    } catch (error) {
        console.error('Error al modificar categoría:', error);
        throw error;
    }
}

// Ver todas las categorías
export async function verCategorias() {
    try {
        const query = 'SELECT * FROM categoria';
        const result = await conexionbbdd.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
}

// Añadir subcategoría
export async function anadirSubCategoria(subcategoria, id_categoria) {
    try {
        const query = 'INSERT INTO subcategoria (nombre, categoria_id) VALUES ($1, $2)';
        const result = await conexionbbdd.query(query, [subcategoria, id_categoria]);
        return result;
    } catch (error) {
        console.error('Error al añadir subcategoría:', error);
        throw error;
    }
}

// Eliminar subcategoría
export async function eliminarSubCategoria(id) {
    try {
        const query = 'DELETE FROM subcategoria WHERE id = $1';
        const result = await conexionbbdd.query(query, [id]);
        return result;
    } catch (error) {
        console.error('Error al eliminar subcategoría:', error);
        throw error;
    }
}

// Modificar subcategoría
export async function modificarSubCategoria(id, subcategoria) {
    try {
        const query = 'UPDATE subcategoria SET nombre = $1 WHERE id = $2';
        const result = await conexionbbdd.query(query, [subcategoria, id]);
        return result;
    } catch (error) {
        console.error('Error al modificar subcategoría:', error);
        throw error;
    }
}

// Ver subcategorías de una categoría
export async function verSubCategoriade(id_categoria) {
    try {
        const query = 'SELECT * FROM subcategoria WHERE categoria_id = $1';
        const result = await conexionbbdd.query(query, [id_categoria]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener subcategorías de una categoría:', error);
        throw error;
    }
}

// Ver productos de una subcategoría
export async function getProductBySubcategoryId(id) {
    try {
        const query = 'SELECT * FROM articulo WHERE subcategoria_id = $1';
        const result = await conexionbbdd.query(query, [id]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener productos por subcategoría:', error);
        throw error;
    }
}
*/
