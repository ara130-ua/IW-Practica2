import { supabase } from '../utils/supabase.ts'
import CryptoJS from 'crypto-js'
export class Usuario {
  constructor(
    id,
    email,
    nombre,
    password,
    apellidos,
    telefono,
    postal,
    rol,
    dni,
    genero,
    fecha_nacimiento,
    direccion,
    iv,
  ) {
    this.id = id
    this.email = email
    this.nombre = nombre
    this.password = password
    this.apellidos = apellidos
    this.telefono = telefono
    this.postal = postal
    this.rol = rol
    this.dni = dni
    this.genero = genero
    this.fecha_nacimiento = fecha_nacimiento
    this.direccion = direccion
    this.iv = iv
  }

  // Getters
  getId() {
    return this.id
  }

  getEmail() {
    return this.email
  }

  getNombre() {
    return this.nombre
  }

  getPassword() {
    return this.password
  }

  getApellidos() {
    return this.apellidos
  }

  getTelefono() {
    return this.telefono
  }

  getPostal() {
    return this.postal
  }

  getRol() {
    return this.rol
  }

  getDni() {
    return this.dni
  }

  getGenero() {
    return this.genero
  }

  getFechaNacimiento() {
    return this.fecha_nacimiento
  }

  getDireccion() {
    return this.direccion
  }

  getIv() {
    return this.iv
  }
  // Setters
  setId(id) {
    this.id = id
  }

  setEmail(email) {
    this.email = email
  }

  setNombre(nombre) {
    this.nombre = nombre
  }

  setPassword(password) {
    this.password = password
  }

  setApellidos(apellidos) {
    this.apellidos = apellidos
  }

  setTelefono(telefono) {
    this.telefono = telefono
  }

  setPostal(postal) {
    this.postal = postal
  }

  setRol(rol) {
    this.rol = rol
  }

  setDni(dni) {
    this.dni = dni
  }

  setGenero(genero) {
    this.genero = genero
  }

  setFechaNacimiento(fecha_nacimiento) {
    this.fecha_nacimiento = fecha_nacimiento
  }

  setDireccion(direccion) {
    this.direccion = direccion
  }

  setIv(iv) {
    this.iv = iv
  }
}

export function generateUID() {
  // Crear un UID único usando la API crypto
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> (c === 'x' ? 0 : 1)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

// Función para encriptar una contraseña
export async function encryptPassword(password) {
  try {
    const { data, error } = await supabase.from('encrypt_key').select('*').single()

    if (error) {
      throw error
    }

    console.log(data.key)

    const secretKey = data.key // Clave secreta desde Supabase
    const iv = CryptoJS.lib.WordArray.random(16) // Generar un IV aleatorio

    // Encriptar
    const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString()

    return {
      iv: iv.toString(CryptoJS.enc.Hex), // Convertir el IV a hex para enviarlo/guardarlo
      encryptedData: encrypted,
    }
  } catch (error) {
    console.error('Error en encryptPassword:', error)
    return null
  }
}

// Función para desencriptar una contraseña
export async function decryptPassword(encryptedData, iv) {
  try {
    const { data, error } = await supabase.from('encrypt_key').select('*').single()

    if (error) {
      throw error
    }

    const secretKey = data.key // Clave secreta desde Supabase

    // Desencriptar
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: CryptoJS.enc.Hex.parse(iv), // Convertir el IV de hex a WordArray
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return decrypted.toString(CryptoJS.enc.Utf8) // Convertir el resultado a texto plano
  } catch (error) {
    console.error('Error en decryptPassword:', error)
    return null
  }
}
/**
 *
 * @param {string} email del usuario a loguear {string} password del usuario a loguear
 * @returns uid del usuario logueado
 */
export async function loginUsuario(email, password) {
  try {
    const user = await obtenerUsuarioEmail(email)
    if (!user) {
      throw Error
    }

    if (password == (await decryptPassword(user.getPassword(), user.getIv()))) return user

    return null
  } catch (error) {
    return null
  }
}
/**
 *
 * @param {objeto usuario} usuario
 * @returns  resultado de la consulta
 */
export async function registrarUsuario(usuario) {
  try {
    const userData = await obtenerUsuarioEmail(usuario.getEmail())

    if (userData) {
      throw Error
    }

    usuario.setId(generateUID())
    const encryptedData = await encryptPassword(usuario.getPassword())
    const { data2, error2 } = await supabase
      .from('cliente')
      .insert([
        {
          id: usuario.getId(),
          email: usuario.getEmail(),
          nombre: usuario.getNombre(),
          apellidos: usuario.getApellidos(),
          telefono: usuario.getTelefono(),
          postal: usuario.getPostal(),
          rol: usuario.getRol(),
          dni: usuario.getDni(),
          genero: usuario.getGenero(),
          fecha_nacimiento: new Date(usuario.getFechaNacimiento()),
          direccion: usuario.getDireccion(),
          iv: encryptedData.iv,
          clave: encryptedData.encryptedData,
        },
      ])
    console.log(usuario)
    if (error2) {
      throw error2
    }

    return usuario
  } catch (error) {
    return null
  }
}

//Modificar información de usuario
/**
 *
 * @param {objeto usuario} usuario
 * @returns resultado de la consulta
 */
export async function modificarUsuario(usuario) {
  try {
    const updatedData = {
      nombre: usuario.getNombre(),
      apellidos: usuario.getApellidos(),
      telefono: usuario.getTelefono(),
      postal: usuario.getPostal(),
      direccion: usuario.getDireccion(),
      genero: usuario.getGenero(),
      fecha_nacimiento: new Date(usuario.getFechaNacimiento()),
    }

    const { error } = await supabase.from('cliente').update(updatedData).eq('id', usuario.getId())

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error modificando usuario:', error)
    return null
  }
}

//Información del usuario, el usuario tiene id, email, nombre, clave, apellidos, telefono, postal, rol
export async function obtenerUsuario(id) {
  try {
    const { data, error } = await supabase.from('cliente').select('*').eq('id', id).single()
    if (error) {
      throw error
    } else {
      return new Usuario(
        data.id,
        data.email,
        data.nombre,
        data.password,
        data.apellidos,
        data.telefono,
        data.postal,
        data.rol,
        data.dni,
        data.genero,
        data.fecha_nacimiento,
        data.direccion,
        data.iv,
      )
    }
  } catch (error) {
    return null
  }
}

export async function obtenerUsuarioEmail(email) {
  try {
    const { data, error } = await supabase.from('cliente').select('*').eq('email', email).single()
    if (error) {
      return null
    } else {
      return new Usuario(
        data.id,
        data.email,
        data.nombre,
        data.clave,
        data.apellidos,
        data.telefono,
        data.postal,
        data.rol,
        data.dni,
        data.genero,
        data.fecha_nacimiento,
        data.direccion,
        data.iv,
      )
    }
  } catch (error) {
    return null
  }
}

//Cerrar sesión del usuario (se encarga el front?)

//Histórico de pedidos de un usuario
export async function obtenerHistoricoPedidos(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM pedido WHERE id_cliente = ?',
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

//Estado del pedido del usuario
export async function obtenerEstadoPedido(id) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query('SELECT * FROM pedido WHERE id = ?', [id], function (error, results) {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//Lista de deseos
//Carrito de la compra del usuario
export async function obtenerListaDeseos(idUsuario) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM lista_deseos where id = ?',
      [idUsuario],
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

//Añadir producto al carrito
export async function anadirProductoListaDeseos(idUsuario, idProducto) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'INSERT INTO lista_deseos (cliente_id, articulo_cod) VALUES (?, ?)',
      [idUsuario, idProducto],
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

//Eliminar producto del carrito
export async function eliminarProductoListaDeseos(idUsuario, idProducto) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'DELETE FROM lista_deseos WHERE cliente_id = ? AND articulo_cod = ?',
      [idUsuario, idProducto],
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

//Carrito de la compra del usuario
export async function obtenerCarrito(idUsuario) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'SELECT * FROM carrito where id = ?',
      [idUsuario],
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

//Añadir producto al carrito
export async function anadirProductoCarrito(idUsuario, idProducto, cantidad) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'INSERT INTO carrito (cliente_id, articulo_cod, cantidad) VALUES (?, ?, ?)',
      [idUsuario, idProducto, cantidad],
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

//Eliminar producto del carrito
export async function eliminarProductoCarrito(idUsuario, idProducto) {
  return new Promise((resolve, reject) => {
    conexionbbdd.query(
      'DELETE FROM carrito WHERE cliente_id = ? AND articulo_cod = ?',
      [idUsuario, idProducto],
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
