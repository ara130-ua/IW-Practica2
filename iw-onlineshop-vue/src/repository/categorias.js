import { conexionbbdd } from "../conexionbbdd.js";


//Gestionar categorías
export async function anadirCategoria( categoria ){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('INSERT INTO categoria (nombre) VALUES (?)', [categoria], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Ver productos de una categoria dado su nombre
export async function getProductByCategoryName(name){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM articulo a, categoria c WHERE a.categoria_id = c.id and c.nombre = ?', [name], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// Ver productos de una categoria dado su id
export async function getProductByCategoryId(id){
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

//eliminarCategoria()
export async function eliminarCategoria(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('DELETE FROM categoria WHERE id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//modificarCategoria()
export async function modificarCategoria(id, categoria){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('UPDATE categoria SET nombre = ? WHERE id = ?', [categoria, id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verCategorias()
export async function verCategorias(){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM categoria', function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


//anadirSubCategoria()
export async function anadirSubCategoria( subcategoria, id_categoria){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('INSERT INTO subcategoria (nombre, categoria_id) VALUES (?, ?)', [subcategoria, id_categoria], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//eliminarSubCategoria()
export async function eliminarSubCategoria(id){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('DELETE FROM subcategoria WHERE id = ?', [id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//modificarSubCategoria()
export async function modificarSubCategoria(id, subcategoria){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('UPDATE subcategoria SET nombre = ? WHERE id = ?', [subcategoria, id], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//verSubCategoriade()
export async function verSubCategoriade(id_categoria){
    return new Promise((resolve, reject) => {
        conexionbbdd.query('SELECT * FROM subcategoria WHERE categoria_id = ?', [id_categoria], function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// ver productos de una subcategoria
export async function getProductBySubcategoryId(id){
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
