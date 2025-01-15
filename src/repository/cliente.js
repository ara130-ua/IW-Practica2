import { conexionbbdd } from "../conexionbbdd.js";

export class Usuario {
    constructor(id, email, nombre, password, apellidos, telefono, postal, rol){
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.password = password;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.postal = postal;
        this.rol = rol;
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
}

/**
 *
 * @param {objeto usuario} usuario
 * @returns resultado de la consulta
 */
export async function loginUsuario(usuario){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM cliente WHERE email = ? AND clave = ?', [usuario.getEmail(), usuario.getPassword()], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 *
 * @param {objeto usuario} usuario
 * @returns  resultado de la consulta
 */
export async function registrarUsuario(usuario){
    return new Promise((resolve, reject) => {
        //Encriptar contraseña
        conexionbbdd.query('INSERT INTO cliente (nombre, email, clave, apellidos, telefono, postal, rol) VALUES (?, ?, ?, ?, ?, ?, ?)', [usuario.getNombre(), usuario.getEmail(), usuario.getPassword(), usuario.getApellidos(), usuario.getTelefono(), usuario.getPostal(), usuario.getRol()], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM cliente WHERE id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
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
