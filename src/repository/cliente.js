import { supabase } from "../utils/supabase.ts";
export class Usuario {
    constructor(id, email, nombre, password, apellidos, telefono, postal, rol, dni, genero, fecha_nacimiento, direccion){
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.password = password;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.postal = postal;
        this.rol = rol;
        this.dni = dni;
        this.genero = genero;
        this.fecha_nacimiento = fecha_nacimiento;
        this.direccion = direccion;
    }

    // Getters
    getId(){
        return this.id;
    }
    
    getEmail(){
        return this.email;
    }

    getNombre(){
        return this.nombre;
    }

    getPassword(){
        return this.password;
    }

    getApellidos(){
        return this.apellidos;
    }

    getTelefono(){
        return this.telefono;
    }

    getPostal(){
        return this.postal;
    }

    getRol(){
        return this.rol;
    }

    getDni(){
        return this.dni;
    }
    
    getGenero(){
        return this.genero;
    }

    getFechaNacimiento(){
        return this.fecha_nacimiento;
    }

    getDireccion(){
        return this.direccion;
    }
    // Setters
    setId(id){
        this.id = id;
    }

    setEmail(email){
        this.email = email;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    setPassword(password){
        this.password = password;
    }

    setApellidos(apellidos){
        this.apellidos = apellidos;
    }

    setTelefono(telefono){
        this.telefono = telefono;
    }

    setPostal(postal){
        this.postal = postal;
    }

    setRol(rol){
        this.rol = rol;
    }

    setDni(dni){
        this.dni = dni;
    }

    setGenero(genero){
        this.genero = genero;
    }

    setFechaNacimiento(fecha_nacimiento){
        this.fecha_nacimiento = fecha_nacimiento;
    }

    setDireccion(direccion){
        this.direccion = direccion;
    }
}

/**
 *
 * @param {string} email del usuario a loguear {string} password del usuario a loguear
 * @returns uid del usuario logueado
 */
export async function loginUsuario(email, password){

    try {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            throw error;
        }
        return data.user.id;
    } catch (error) {
        return null
    }
}
/**
 *
 * @param {objeto usuario} usuario
 * @returns  resultado de la consulta
 */
export async function registrarUsuario(usuario){
    try {
        const {data, error} = await supabase.auth.signUp({
            email: usuario.getEmail(),
            password: usuario.getPassword()
        });

        if (error) {
            throw error;
        }

        usuario.setId(data.user.id);

        const {data2, error2} = await supabase
                                    .from('cliente')
                                    .insert([
                                        {id: usuario.getId(),
                                        email: usuario.getEmail(),
                                        nombre: usuario.getNombre(),
                                        apellidos: usuario.getApellidos(),
                                        telefono: usuario.getTelefono(),
                                        localidad: usuario.getPostal(),
                                        rol: usuario.getRol(),
                                        dni: usuario.getDni(),
                                        genero: usuario.getGenero(),
                                        fecha_nacimiento: usuario.getFechaNacimiento(),
                                        direccion: usuario.getDireccion()}]);
        console.log(usuario);
        if (error2) {
            throw error2;
        }
        
        return usuario;
    } catch (error) {
        return null;
    }
}

//Modificar información de usuario
/**
 *
 * @param {objeto usuario} usuario
 * @returns resultado de la consulta
 */
export async function modificarUsuario(usuario){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('UPDATE cliente SET nombre = ?, email = ?, password = ?, apellidos = ?, telefono = ?, apellidos = ?, postal = ? WHERE id = ?', [usuario.getNombre(), usuario.getEmail(), usuario.getPassword(), usuario.getApellidos(), usuario.getTelefono(), usuario.getPostal(), usuario.getId()], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//Información del usuario, el usuario tiene id, email, nombre, clave, apellidos, telefono, postal, rol
export async function obtenerUsuario(id){
    try {
        const { data, error } = await supabase
                                    .from('cliente')
                                    .select('*')
                                    .eq('id', id)
                                    .single();
        if (error) {
            throw error;
        } else {
            return new Usuario(data.id, data.email, data.nombre, data.password, data.apellidos, data.telefono, data.postal, data.rol);
        }
    } catch (error) {
        return null;
    }
}

//Cerrar sesión del usuario (se encarga el front?)

//Histórico de pedidos de un usuario
export async function obtenerHistoricoPedidos(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM pedido WHERE id_cliente = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//Estado del pedido del usuario
export async function obtenerEstadoPedido(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM pedido WHERE id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//Lista de deseos
//Carrito de la compra del usuario
export async function obtenerListaDeseos(idUsuario){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM lista_deseos where id = ?', [idUsuario], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//Añadir producto al carrito
export async function anadirProductoListaDeseos(idUsuario, idProducto){
  return new Promise((resolve, reject) => {
      conexionbbdd.query('INSERT INTO lista_deseos (cliente_id, articulo_cod) VALUES (?, ?)', [idUsuario, idProducto], function (error, results) {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
}

//Eliminar producto del carrito
export async function eliminarProductoListaDeseos(idUsuario, idProducto){
  return new Promise((resolve, reject) => {
      conexionbbdd.query('DELETE FROM lista_deseos WHERE cliente_id = ? AND articulo_cod = ?', [idUsuario, idProducto], function (error, results) {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
}

//Carrito de la compra del usuario
export async function obtenerCarrito(idUsuario){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM carrito where id = ?', [idUsuario], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//Añadir producto al carrito
export async function anadirProductoCarrito(idUsuario, idProducto, cantidad){
  return new Promise((resolve, reject) => {
      conexionbbdd.query('INSERT INTO carrito (cliente_id, articulo_cod, cantidad) VALUES (?, ?, ?)', [idUsuario, idProducto, cantidad], function (error, results) {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
}

//Eliminar producto del carrito
export async function eliminarProductoCarrito(idUsuario, idProducto){
  return new Promise((resolve, reject) => {
      conexionbbdd.query('DELETE FROM carrito WHERE cliente_id = ? AND articulo_cod = ?', [idUsuario, idProducto], function (error, results) {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
}
