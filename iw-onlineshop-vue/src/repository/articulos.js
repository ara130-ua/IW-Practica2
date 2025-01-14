import { conexionbbdd } from "@/conexionbbdd";

//crearArticulo() referencia, nombre, descripcion-corta, descripcion-larga, detalles, modelo, talla, precio, descuento, marca_id, categoria_id, subcategoria_id
export async function crearArticulo(articulo){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('INSERT INTO articulo (referencia, nombre, descripcion_corta, descripcion_larga, detalles, modelo, talla, precio, descuento, marca_id, categoria_id, subcategoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [articulo.referencia, articulo.nombre, articulo.descripcion, articulo.descripcion_larga, articulo.detalles, articulo.modelo, articulo.talla, articulo.precio, articulo.descuento, articulo.marca_id, articulo.categoria_id, articulo.subcategoria_id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }
    );
}

//eliminarArticulo()
export async function eliminarArticulo(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('DELETE FROM articulo WHERE id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//modificarArticulo()
export async function modificarArticulo(articulo){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('UPDATE articulo SET referencia = ?, nombre = ?, descripcion_corta = ?, descripcion_larga = ?, detalles = ?, modelo = ?, talla = ?, precio = ?, descuento = ?, marca_id = ?, categoria_id = ?, subcategoria_id = ? WHERE id = ?', [articulo.referencia, articulo.nombre, articulo.descripcion, articulo.descripcion_larga, articulo.detalles, articulo.modelo, articulo.talla, articulo.precio, articulo.descuento, articulo.marca_id, articulo.categoria_id, articulo.subcategoria_id, articulo.id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    }
    );
}

//verArticulos()
export async function verArticulos(){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


//verArticulo()
export async function verArticulo(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo WHERE id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verArticulosPorCategoria()
export async function verArticulosPorCategoria(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo WHERE categoria_id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verArticulosPorSubCategoria()
export async function verArticulosPorSubCategoria(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo WHERE subcategoria_id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verArticulosPorMarca()
export async function verArticulosPorMarca(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo WHERE marca_id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//ver Articulos que tengan un descuento
export async function verArticulosConDescuento(){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo WHERE descuento > 0', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verArticulosPorPrecio de menor a mayor
export async function verArticulosPorPrecio(){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo ORDER BY precio ASC', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verArticulos por precio de mayor a menor
export async function verArticulosPorPrecioDesc(){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo ORDER BY precio DESC', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//filtrar articulos por talla XS, S, M, L, XL
export async function verArticulosPorTalla(talla){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo WHERE talla = ?', [talla], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
