-- Creación de la tabla 'marca'
CREATE TABLE marca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL
);

-- Creación de la tabla 'imagen'
CREATE TABLE imagen (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imagen VARCHAR(255) NOT NULL,
    es_principal BOOLEAN NOT NULL
);

-- Creación de la tabla 'categoria'
CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL
);

-- Creación de la tabla 'subcategoria'
CREATE TABLE subcategoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Creación de la tabla 'articulo'
CREATE TABLE articulo (
    cod INT PRIMARY KEY AUTO_INCREMENT,
    referencia VARCHAR(255),
    nombre VARCHAR(255) NOT NULL,
    descripcion_corta VARCHAR(255),
    descripcion_larga TEXT,
    detalles TEXT,
    modelo VARCHAR(255),
    talla VARCHAR(50),
    precio DECIMAL(10,2),
    descuento DECIMAL(5,2),
    marca_id INT,
    subcategoria_id INT,
    FOREIGN KEY (marca_id) REFERENCES marca(id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategoria(id)
);

-- Creación de la tabla 'tienda'
CREATE TABLE tienda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    email VARCHAR(255),
    web VARCHAR(255),
    telefono VARCHAR(50)
);

-- Tabla de existencias entre tienda y articulo
CREATE TABLE existencias (
    tienda_id INT,
    articulo_cod INT,
    cantidad INT NOT NULL,
    PRIMARY KEY (tienda_id, articulo_cod),
    FOREIGN KEY (tienda_id) REFERENCES tienda(id),
    FOREIGN KEY (articulo_cod) REFERENCES articulo(cod)
);

-- Creación de la tabla 'pedido'
CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    importe DECIMAL(10,2),
    modo_entrega VARCHAR(100),
    gastos_envio DECIMAL(10,2),
    estado VARCHAR(50)
);

-- Creación de la tabla 'cliente'
CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    telefono VARCHAR(50),
    postal VARCHAR(10),
    rol VARCHAR(50)
);

-- Tabla de carrito entre cliente y articulo
CREATE TABLE carrito (
    cliente_id INT,
    articulo_cod INT,
    cantidad INT NOT NULL,
    PRIMARY KEY (cliente_id, articulo_cod),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (articulo_cod) REFERENCES articulo(cod)
);

-- Tabla de lista de deseos entre cliente y articulo
CREATE TABLE lista_deseos (
    cliente_id INT,
    articulo_cod INT,
    PRIMARY KEY (cliente_id, articulo_cod),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (articulo_cod) REFERENCES articulo(cod)
);

-- Creación de la tabla 'comentario'
CREATE TABLE comentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comentario TEXT NOT NULL,
    articulo_cod INT,
    cliente_id INT,
    FOREIGN KEY (articulo_cod) REFERENCES articulo(cod),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

-- Tabla 'lin_ped' entre pedido y articulo
CREATE TABLE lin_ped (
    pedido_id INT,
    articulo_cod INT,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (pedido_id, articulo_cod),
    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (articulo_cod) REFERENCES articulo(cod)
);
