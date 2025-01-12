import { conexionbbdd } from "../conexionbbdd.js";

/**
 *
 * @param {objeto usuario} usuario
 * @returns resultado de la consulta
 */
export async function loginUsuario(usuario){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM cliente WHERE email = ? AND clave = ?', [usuario.email, usuario.password], function (error, results) {
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
        conexionbbdd.query('INSERT INTO cliente (nombre, email, password) VALUES (?, ?, ?)', [usuario.nombre, usuario.email, usuario.password], function (error, results) {
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
        conexionbbdd.query('UPDATE cliente SET nombre = ?, apellidos = ?, email = ?, password = ? WHERE id = ?', [usuario.nombre, usuario.apellidos, usuario.email, usuario.password, usuario.id], function (error, results) {
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
