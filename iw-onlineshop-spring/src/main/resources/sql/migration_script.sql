DROP TABLE IF EXISTS lin_ped;
DROP TABLE IF EXISTS comentario;
DROP TABLE IF EXISTS lista_deseos;
DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS existencias;
DROP TABLE IF EXISTS tienda;
DROP TABLE IF EXISTS imagen;
DROP TABLE IF EXISTS articulo;
DROP TABLE IF EXISTS subcategoria;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS marca;

-- Creación de la tabla 'marca'
CREATE TABLE marca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL
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
    categoria_id INT,
    subcategoria_id INT,
    FOREIGN KEY (marca_id) REFERENCES marca(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id),
    FOREIGN KEY (subcategoria_id) REFERENCES subcategoria(id)
);

-- Creación de la tabla 'imagen'
CREATE TABLE imagen (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imagen VARCHAR(255) NOT NULL,
    es_principal BOOLEAN NOT NULL,
    articulo_cod INT,
    FOREIGN KEY (articulo_cod) REFERENCES articulo(cod)
);

-- Creación de la tabla 'tienda'
CREATE TABLE tienda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    web VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL
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

-- Creación de la tabla 'pedido'
CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    importe DECIMAL(10,2),
    modo_entrega VARCHAR(100),
    gastos_envio DECIMAL(10,2),
    estado VARCHAR(50),
    cliente_id INT,
    tienda_id INT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (tienda_id) REFERENCES tienda(id)
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

-- TABLA MARCA  
INSERT INTO marca (nombre) VALUES 
('Adidas'),
('Nike'),
('Puma'),
('Reebok'),
('Fila');

-- TABLA CATEGORIA
INSERT INTO categoria (nombre) VALUES 
('Futbol'),
('Baloncesto'),
('Running'),
('Padel'),
('Tenis');

-- TABLA SUBCATEGORIA
INSERT INTO subcategoria (nombre, categoria_id) VALUES 
-- futbol
('Camisetas', 1),
('Pantalones', 1),
('Zapatillas', 1),
('Balones', 1),
('Accesorios', 1),
-- baloncesto
('Camisetas', 2),
('Pantalones', 2),
('Zapatillas', 2),
('Balones', 2),
('Accesorios', 2),
-- running
('Camisetas', 3),
('Pantalones', 3),
('Zapatillas', 3),
('Accesorios', 3),
-- padel
('Camisetas', 4)
('Pantalones', 4)
('Zapatillas', 4),
('Palas', 4),
('Pelotas', 4),
('Accesorios', 4),
-- tenis
('Camisetas', 5)
('Pantalones', 5)
('Zapatillas', 5),
('Palas', 5),
('Pelotas', 5),
('Accesorios', 5);

-- TABLA ARTICULO
INSERT INTO articulo (referencia, nombre, descripcion_corta, descripcion_larga, detalles, modelo, talla, precio, descuento, marca_id, subcategoria_id, categoria_id) VALUES 
('REF-4152', 'Advance Palas Tenis', 'Palas de tenis de alto rendimiento.', 'Palas diseñadas específicamente para jugadores que buscan un equilibrio perfecto entre control y potencia. Materiales avanzados para una larga durabilidad y un juego de alto nivel.', 'Disponible en varios tamaños y colores. Garantía de calidad para un juego de alto rendimiento.', 'Modelo-32', 'L', 62.99, 0, 4, 4, 5),
('REF-8700', 'Xtreme Camisetas Padel', 'Camisetas de padel con tecnología de transpiración.', 'Camisetas creadas para los amantes del pádel, con tejidos que favorecen la transpiración y ofrecen comodidad durante todo el partido. Ideal para climas calurosos.', 'Disponible en varios tamaños y colores. Producto garantizado para un rendimiento óptimo en cada jugada.', 'Modelo-43', 'XL', 180.64, 0, 1, 1, 4),
('REF-1090', 'Pro Pantalones Running', 'Pantalones ideales para corredores exigentes.', 'Pantalones diseñados con materiales ligeros y de alta elasticidad, proporcionando máxima comodidad y libertad de movimiento durante cualquier entrenamiento o carrera.', 'Disponible en varios tamaños y colores. Perfectos para entrenamientos prolongados o competiciones.', 'Modelo-38', 'S', 93.34, 0, 3, 2, 3),
('REF-7143', 'Elite Camisetas Tenis', 'Camisetas de tenis de alto rendimiento.', 'Camisetas deportivas de alta calidad, ideales para el tenis competitivo. Con tejidos que se adaptan al cuerpo y mejoran el rendimiento durante los partidos.', 'Disponible en varios tamaños y colores. Producto recomendado para jugadores de nivel avanzado.', 'Modelo-34', 'XL', 170.73, 0, 5, 1, 5),
('REF-4159', 'Xtreme Zapatillas Futbol', 'Zapatillas de fútbol de alta durabilidad.', 'Zapatillas especialmente diseñadas para el fútbol, con una suela de gran tracción para mejorar el rendimiento en el campo. Resistentes y cómodas para largas jornadas de juego.', 'Disponible en varios tamaños y colores. Producto garantizado para un rendimiento excelente en el campo.', 'Modelo-17', 'M', 153.76, 0, 1, 3, 1),
('REF-3456', 'Xtreme Zapatillas Running', 'Zapatillas ideales para corredores de alto rendimiento.', 'Zapatillas de running diseñadas con tecnología avanzada para corredores que buscan confort, ligereza y resistencia. La suela de alta tracción asegura un rendimiento superior.', 'Disponible en varios tamaños y colores. Producto recomendado para corredores profesionales.', 'Modelo-37', 'L', 140.69, 0, 5, 3, 3),
('REF-9500', 'Classic Zapatillas Futbol', 'Zapatillas de fútbol clásicas y resistentes.', 'Diseño clásico y robusto para jugadores de fútbol que requieren durabilidad y rendimiento en el campo. Comodidad garantizada durante todo el partido.', 'Disponible en varios tamaños y colores. Producto diseñado para resistir partidos intensos.', 'Modelo-48', 'L', 135.15, 0, 3, 3, 1),
('REF-6321', 'Advance Camisetas Tenis', 'Camisetas deportivas para tenistas.', 'Camisetas diseñadas para garantizar comodidad y flexibilidad durante el partido. Con tejidos especiales para la transpiración y mantener el cuerpo seco.', 'Disponible en varios tamaños y colores. Garantía de comodidad y resistencia.', 'Modelo-34', 'S', 131.67, 0, 3, 1, 5),
('REF-2800', 'Classic Accesorios Running', 'Accesorios imprescindibles para corredores.', 'Accesorios diseñados para mejorar la experiencia de running, desde cintas para la cabeza hasta mochilas. Prácticos y cómodos para tus entrenamientos o carreras.', 'Disponible en varios tamaños y colores. Producto ideal para acompañar tu rutina de entrenamiento.', 'Modelo-5', 'S', 65.31, 0, 1, 4, 3),
('REF-1896', 'Advance Accesorios Running', 'Accesorios innovadores para corredores exigentes.', 'Accesorios avanzados que facilitan y mejoran el rendimiento de los corredores. Con diseños ergonómicos para máxima comodidad durante tus entrenamientos.', 'Disponible en varios tamaños y colores. Producto garantizado para mejorar tu desempeño en carreras de larga distancia.', 'Modelo-34', 'S', 53.0, 0, 3, 4, 3),
('REF-9372', 'Elite Zapatillas Padel', 'Zapatillas deportivas diseñadas para padel.', 'Zapatillas ideales para el pádel, con una suela de tracción optimizada y materiales que brindan comodidad durante partidos largos. Perfectas para jugadores profesionales.', 'Disponible en varios tamaños y colores. Producto diseñado para rendir al máximo en la cancha de padel.', 'Modelo-25', 'S', 178.84, 0, 5, 3, 4),
('REF-2817', 'Elite Accesorios Running', 'Accesorios de running para atletas profesionales.', 'Accesorios de alta calidad diseñados para optimizar tu rendimiento al correr, desde bandas para el sudor hasta mochilas ultra ligeras. Muy cómodos y funcionales.', 'Disponible en varios tamaños y colores. Producto altamente recomendable para corredores serios.', 'Modelo-47', 'L', 51.36, 0, 2, 4, 3),
('REF-6842', 'Xtreme Camisetas Tenis', 'Camisetas técnicas para jugadores de tenis.', 'Camisetas que combinan alta tecnología con comodidad. Diseñadas para ofrecer transpirabilidad y soporte durante el juego más intenso.', 'Disponible en varios tamaños y colores. Producto recomendado para tenistas profesionales y amateurs.', 'Modelo-6', 'XL', 179.64, 0, 5, 1, 5),
('REF-7923', 'Elite Accesorios Futbol', 'Accesorios esenciales para futbolistas.', 'Accesorios pensados para los futbolistas, desde gorras hasta muñequeras, para ofrecerte comodidad y protección durante el juego en el campo de fútbol.', 'Disponible en varios tamaños y colores. Producto de alta calidad para jugadores exigentes.', 'Modelo-23', 'L', 40.91, 0, 2, 5, 1),
('REF-8301', 'Elite Pantalones Running', 'Pantalones técnicos para corredores.', 'Pantalones diseñados para mantenerte cómodo y seguro mientras corres, con tejidos avanzados para absorber el sudor y permitir la máxima libertad de movimiento.', 'Disponible en varios tamaños y colores. Producto de alta gama para entrenamientos y competiciones.', 'Modelo-39', 'XL', 67.44, 0, 2, 2, 3),
('REF-1996', 'Xtreme Camisetas Padel', 'Camisetas de padel para jugadores competitivos.', 'Camisetas diseñadas específicamente para el pádel, con materiales que permiten máxima movilidad y comodidad durante el juego. Ideal para climas cálidos.', 'Disponible en varios tamaños y colores. Producto recomendado para jugadores profesionales.', 'Modelo-30', 'M', 170.88, 0, 2, 1, 4),
('REF-5501', 'Elite Pantalones Futbol', 'Pantalones ideales para futbolistas.', 'Pantalones diseñados para el fútbol, con materiales que garantizan comodidad y libertad de movimiento. Perfectos para entrenamientos o partidos largos.', 'Disponible en varios tamaños y colores. Producto ideal para jugadores de fútbol que buscan rendimiento y comodidad.', 'Modelo-7', 'L', 37.05, 0, 5, 2, 1),
('REF-6950', 'Classic Zapatillas Running', 'Zapatillas ligeras para corredores.', 'Zapatillas cómodas y ligeras para corredores que buscan velocidad y comodidad en cada zancada. Con tecnología de amortiguación avanzada para proteger las articulaciones.', 'Disponible en varios tamaños y colores. Producto diseñado para runners que buscan mejorar su rendimiento.', 'Modelo-1', 'XL', 131.14, 0, 2, 3, 3),
('REF-9665', 'Advance Accesorios Padel', 'Accesorios profesionales para pádel.', 'Accesorios de alta calidad diseñados para optimizar tu juego de pádel, desde muñequeras hasta cintas deportivas, todo lo que necesitas para tu mejor rendimiento.', 'Disponible en varios tamaños y colores. Producto garantizado para pádel.', 'Modelo-28', 'S', 104.54, 0, 3, 6, 4),
('REF-4200', 'Advance Palas Padel', 'Palas de pádel avanzadas para deportistas.', 'Palas diseñadas para jugadores que buscan la perfección en el control y potencia. Con un diseño aerodinámico para una mayor velocidad en cada golpe.', 'Disponible en varios tamaños y colores. Producto recomendado para jugadores de nivel medio a alto.', 'Modelo-31', 'M', 51.01, 0, 4, 4, 4),
('REF-9251', 'Advance Camisetas Running', 'Camisetas ideales para corredores.', 'Camisetas técnicas que ofrecen soporte y comodidad. Materiales de última tecnología para mantenerte seco y cómodo durante toda la carrera.', 'Disponible en varios tamaños y colores. Producto de alta gama para atletas que buscan rendimiento.', 'Modelo-10', 'L', 196.99, 0, 4, 1, 3),
('REF-1076', 'Advance Balones Futbol', 'Balón de fútbol profesional.', 'Balón de fútbol de alta calidad, diseñado para proporcionar un toque perfecto y un rendimiento óptimo en el campo. Ideal para entrenamientos y partidos profesionales.', 'Disponible en varios tamaños y colores. Producto diseñado para jugadores profesionales.', 'Modelo-42', 'XL', 182.58, 0, 2, 4, 1),
('REF-6779', 'Xtreme Zapatillas Futbol', 'Zapatillas para futbolistas profesionales.', 'Zapatillas especialmente diseñadas para el fútbol, con una suela de gran tracción para mejorar el rendimiento en el campo. Resistentes y cómodas para largas jornadas de juego.', 'Disponible en varios tamaños y colores. Producto garantizado para un rendimiento excelente en el campo.', 'Modelo-8', 'M', 74.85, 0, 4, 3, 1),
('REF-9779', 'Classic Zapatillas Tenis', 'Zapatillas de tenis cómodas y de alto rendimiento.', 'Zapatillas diseñadas para tenis, con suelas que ofrecen gran tracción y estabilidad. Perfectas para partidos largos y entrenamiento intensivo.', 'Disponible en varios tamaños y colores. Producto recomendado para jugadores amateurs y profesionales.', 'Modelo-26', 'L', 157.85, 0, 3, 3, 5),
('REF-2937', 'Classic Accesorios Running', 'Accesorios diseñados específicamente para corredores, fabricados con materiales de alto rendimiento que aseguran comodidad y resistencia.', 'Estos accesorios son ideales para corredores apasionados que buscan mejorar su rendimiento, con un diseño ergonómico y materiales duraderos que optimizan la experiencia en cada carrera.', 'Disponible en varios tamaños y colores. Producto garantizado con una excelente relación calidad-precio.', 'Modelo-27', 'L', 23.41, 0, 4, 4, 3),
('REF-5138', 'Elite Accesorios Baloncesto', 'Accesorios deportivos de alta gama, especialmente pensados para baloncestistas que exigen lo mejor en cada partido.', 'Perfectos para jugadores de baloncesto, estos accesorios ofrecen una comodidad excepcional y soporte durante intensas sesiones de juego. Hechos para durar y adaptarse al movimiento rápido del baloncesto.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para jugadores competitivos.', 'Modelo-45', 'S', 78.41, 0, 1, 5, 2),
('REF-2130', 'Elite Pantalones Futbol', 'Pantalones deportivos diseñados para futbolistas profesionales, con un ajuste perfecto que maximiza el confort y la libertad de movimiento.', 'Estos pantalones son ideales para jugadores de fútbol que buscan rendimiento, resistencia y estilo en el campo, con materiales que ofrecen transpirabilidad y durabilidad.', 'Disponible en varios tamaños y colores. Producto garantizado para el máximo rendimiento en el campo.', 'Modelo-49', 'S', 95.16, 0, 1, 2, 1),
('REF-8454', 'Advance Accesorios Running', 'Accesorios avanzados para corredores exigentes, combinando tecnología y comodidad para un rendimiento excepcional.', 'Con estos accesorios, los corredores pueden disfrutar de una experiencia más fluida y cómoda, con materiales de alta calidad que permiten una gran transpirabilidad y soporte durante carreras largas.', 'Disponible en varios tamaños y colores. Producto garantizado para los runners más exigentes.', 'Modelo-8', 'XL', 162.34, 0, 1, 4, 3),
('REF-8390', 'Advance Camisetas Tenis', 'Camisetas de tenis de alta calidad, diseñadas para mantener el confort durante el juego intenso y los entrenamientos prolongados.', 'Estas camisetas ofrecen una excelente transpiración y libertad de movimiento para los jugadores de tenis, gracias a su tejido técnico que favorece el rendimiento en la cancha.', 'Disponible en varios tamaños y colores. Producto garantizado para un rendimiento superior.', 'Modelo-43', 'XL', 39.59, 0, 5, 1, 5),
('REF-4104', 'Pro Accesorios Futbol', 'Accesorios diseñados para futbolistas profesionales, ideales para optimizar el rendimiento y la protección durante los partidos.', 'Estos accesorios ofrecen una combinación perfecta de durabilidad y confort, permitiendo a los futbolistas maximizar su rendimiento y mantener el control en cada jugada.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas de alto nivel.', 'Modelo-31', 'S', 163.0, 0, 1, 5, 1),
('REF-1167', 'Elite Pantalones Baloncesto', 'Pantalones deportivos de alto rendimiento para jugadores de baloncesto, con un diseño que favorece el movimiento y la agilidad.', 'Estos pantalones están hechos con materiales que ofrecen soporte y comodidad durante los partidos de baloncesto más exigentes, ideales para mantener el ritmo sin restricciones.', 'Disponible en varios tamaños y colores. Producto garantizado para baloncestistas profesionales.', 'Modelo-7', 'M', 32.82, 0, 3, 2, 2),
('REF-8317', 'Xtreme Balones Baloncesto', 'Balones de baloncesto de alta calidad, diseñados para ofrecer un excelente rebote y control durante el juego.', 'Perfectos para entrenamientos y partidos, estos balones son ideales para jugadores que buscan precisión y durabilidad, con un diseño optimizado para un agarre superior en cada jugada.', 'Disponible en varios tamaños y colores. Producto garantizado, resistente para todos los niveles de juego.', 'Modelo-35', 'S', 50.85, 0, 3, 4, 2),
('REF-7123', 'Advance Accesorios Running', 'Accesorios deportivos de última tecnología, ideales para corredores que buscan mejorar su rendimiento.', 'Fabricados con materiales avanzados que garantizan transpirabilidad y comodidad, estos accesorios se adaptan perfectamente a las necesidades de los corredores más exigentes.', 'Disponible en varios tamaños y colores. Producto garantizado, diseñado para maximizar el rendimiento.', 'Modelo-46', 'M', 37.97, 0, 1, 4, 3),
('REF-7061', 'Elite Accesorios Running', 'Accesorios diseñados para corredores de alto nivel, con un enfoque en la comodidad y el rendimiento durante carreras largas.', 'Estos accesorios son ideales para corredores que buscan una excelente transpirabilidad y soporte, con un diseño optimizado para reducir la fricción y el cansancio.', 'Disponible en varios tamaños y colores. Producto garantizado para atletas de alto rendimiento.', 'Modelo-15', 'L', 129.8, 0, 5, 4, 3),
('REF-7678', 'Pro Balones Futbol', 'Balones de fútbol de alta gama, pensados para jugadores que requieren precisión y durabilidad en el campo.', 'Con un diseño que favorece el control y la potencia en cada jugada, estos balones son ideales para entrenamientos intensivos y partidos oficiales.', 'Disponible en varios tamaños y colores. Producto garantizado para el máximo rendimiento en cada partido.', 'Modelo-12', 'L', 116.44, 0, 1, 4, 1),
('REF-9832', 'Pro Camisetas Baloncesto', 'Camisetas para baloncesto, diseñadas para ofrecer comodidad y libertad de movimiento en el campo de juego.', 'Fabricadas con materiales ligeros y de alta transpirabilidad, estas camisetas permiten a los jugadores mantenerse frescos durante el juego más intenso.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para jugadores de baloncesto que buscan calidad y confort.', 'Modelo-18', 'M', 51.52, 0, 3, 1, 2),
('REF-3064', 'Advance Zapatillas Padel', 'Zapatillas de padel diseñadas para garantizar un buen agarre y soporte durante el juego, combinando confort y rendimiento.', 'Estas zapatillas están hechas con materiales duraderos que aseguran estabilidad y confort, permitiendo movimientos rápidos y ágiles en la pista de pádel.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores profesionales de pádel.', 'Modelo-36', 'L', 33.9, 0, 2, 3, 4),
('REF-4548', 'Advance Zapatillas Baloncesto', 'Zapatillas de baloncesto de alto rendimiento, con un diseño que favorece la estabilidad y el confort durante el juego.', 'Estas zapatillas están diseñadas para proporcionar un excelente soporte y amortiguación, ideales para jugadores de baloncesto que necesitan rapidez y agilidad en cada jugada.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para profesionales del baloncesto.', 'Modelo-23', 'XL', 83.45, 0, 5, 3, 2),
('REF-1559', 'Pro Accesorios Running', 'Accesorios de running diseñados para optimizar la experiencia del corredor, con materiales de alta calidad para el máximo confort.', 'Ideal para corredores que buscan mejorar su rendimiento, estos accesorios cuentan con características avanzadas como transpirabilidad y soporte en las áreas clave.', 'Disponible en varios tamaños y colores. Producto garantizado para todos los corredores, desde aficionados hasta profesionales.', 'Modelo-10', 'XL', 182.39, 0, 5, 4, 3),
('REF-5399', 'Classic Camisetas Running', 'Camisetas diseñadas para corredores, hechas con un tejido técnico que proporciona comodidad y frescura durante largas distancias.', 'Estas camisetas están hechas con materiales de alta transpirabilidad, lo que permite a los corredores mantenerse secos y cómodos durante sus carreras más largas.', 'Disponible en varios tamaños y colores. Producto garantizado para corredores de todos los niveles.', 'Modelo-9', 'XL', 127.46, 0, 1, 1, 3),
('REF-3102', 'Advance Accesorios Tenis', 'Accesorios diseñados específicamente para tenistas, con materiales de alta calidad que optimizan el confort y el rendimiento en la cancha.', 'Estos accesorios están diseñados para brindar comodidad y soporte durante el juego, permitiendo a los tenistas concentrarse en su rendimiento sin distracciones.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para jugadores de tenis de todos los niveles.', 'Modelo-46', 'S', 143.06, 0, 3, 6, 5),
('REF-7476', 'Elite Zapatillas Futbol', 'Zapatillas de fútbol diseñadas para ofrecer un ajuste perfecto y máxima tracción en el campo.', 'Hechas para los futbolistas más exigentes, estas zapatillas proporcionan un soporte excepcional y un rendimiento superior, garantizando estabilidad durante los movimientos rápidos.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de fútbol que buscan lo mejor.', 'Modelo-15', 'XL', 86.87, 0, 4, 3, 1),
('REF-4955', 'Elite Pantalones Tenis', 'Pantalones diseñados para tenistas, ideales para movimientos rápidos y cambios de dirección en la cancha.', 'Estos pantalones combinan comodidad y estilo, con una tela que proporciona flexibilidad y soporte durante los partidos más exigentes.', 'Disponible en varios tamaños y colores. Producto garantizado, diseñado para optimizar el rendimiento en tenis.', 'Modelo-18', 'M', 199.27, 0, 4, 2, 5),
('REF-8139', 'Xtreme Palas Padel', 'Palas de pádel de alta gama, fabricadas para brindar un control superior y potencia en cada golpe.', 'Diseñadas para jugadores de pádel que buscan precisión y poder, estas palas están hechas con materiales de última tecnología que garantizan durabilidad y rendimiento.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de pádel de alto nivel.', 'Modelo-35', 'M', 127.95, 0, 4, 4, 4),
('REF-7204', 'Pro Zapatillas Futbol', 'Zapatillas de fútbol diseñadas para ofrecer una excelente tracción y soporte durante el juego en terrenos difíciles.', 'Ideales para futbolistas que buscan estabilidad y rapidez, estas zapatillas permiten un control total sobre la pelota y se adaptan perfectamente al terreno.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de fútbol profesionales.', 'Modelo-31', 'S', 146.26, 0, 1, 3, 1),
('REF-3675', 'Pro Zapatillas Tenis', 'Zapatillas diseñadas específicamente para el tenis, ofreciendo una excelente comodidad y estabilidad en la cancha.', 'Estas zapatillas cuentan con un diseño avanzado que proporciona soporte durante los movimientos rápidos, ayudando a los jugadores de tenis a mantener el control total del juego.', 'Disponible en varios tamaños y colores. Producto garantizado para tenistas de alto rendimiento.', 'Modelo-30', 'L', 57.69, 0, 1, 3, 5),
('REF-9177', 'Elite Palas Tenis', 'Palas de tenis diseñadas para jugadores que buscan una gran potencia y control en sus golpes.', 'Estas palas ofrecen un equilibrio perfecto entre control y potencia, ideal para jugadores de tenis que desean optimizar su rendimiento en cada golpe.', 'Disponible en varios tamaños y colores. Producto garantizado para tenistas que exigen lo mejor en cada partido.', 'Modelo-35', 'M', 122.39, 0, 1, 4, 5),
('REF-2317', 'Xtreme Pantalones Padel', 'Pantalones de pádel diseñados para ofrecer la máxima comodidad y libertad de movimiento durante el juego.', 'Hechos con materiales ligeros y resistentes, estos pantalones son ideales para jugadores que buscan una prenda cómoda y duradera para sus partidos de pádel.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de pádel de alto nivel.', 'Modelo-45', 'XL', 107.11, 0, 4, 2, 4),
('REF-3740', 'Elite Pantalones Padel', 'Pantalones de pádel de alta calidad, diseñados para ofrecer un ajuste perfecto y comodidad durante largos partidos.', 'Estos pantalones están fabricados con materiales que permiten libertad de movimiento, ideales para jugadores de pádel que buscan rendimiento y confort.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de pádel profesionales.', 'Modelo-1', 'XL', 147.08, 0, 2, 2, 4),
('REF-8925', 'Classic Pantalones Tenis', 'Pantalones diseñados para tenistas, con un tejido técnico que ofrece una gran transpirabilidad y confort.', 'Estos pantalones permiten una libertad de movimiento excelente, ideales para los movimientos rápidos y exigentes del tenis.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de tenis de todos los niveles.', 'Modelo-40', 'L', 58.77, 0, 3, 2, 5),
('REF-7922', 'Classic Camisetas Tenis', 'Camisetas de tenis diseñadas para brindar confort y rendimiento durante los partidos.', 'Fabricadas con un material que garantiza una alta transpirabilidad, estas camisetas permiten que los jugadores se mantengan frescos y cómodos en todo momento.', 'Disponible en varios tamaños y colores. Producto garantizado para tenistas que buscan calidad y confort en la cancha.', 'Modelo-25', 'S', 21.73, 0, 2, 1, 5),
('REF-6950', 'Advance Pantalones Running', 'Pantalones de running diseñados para maximizar el rendimiento de los corredores, ofreciendo una excelente comodidad y transpirabilidad.', 'Estos pantalones son ideales para corredores que buscan ligereza y flexibilidad, con un diseño que favorece la movilidad en cada zancada.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para los runners más exigentes.', 'Modelo-24', 'S', 81.78, 0, 4, 2, 3),
('REF-7088', 'Elite Pantalones Futbol', 'Pantalones de fútbol de alto rendimiento, ideales para jugadores que buscan comodidad y libertad en el campo.', 'Estos pantalones están diseñados para optimizar el rendimiento de los futbolistas durante los entrenamientos y partidos, con un material flexible que mejora el movimiento.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas de alto nivel.', 'Modelo-4', 'XL', 177.43, 0, 2, 2, 1),
('REF-9996', 'Advance Accesorios Running', 'Accesorios de running avanzados que garantizan un ajuste perfecto y comodidad durante carreras largas.', 'Estos accesorios están fabricados con materiales de alta calidad, proporcionando soporte y transpirabilidad, esenciales para los corredores que buscan rendimiento en todo momento.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para runners que exigen lo mejor.', 'Modelo-13', 'M', 150.16, 0, 2, 4, 3);
('REF-2910', 'Classic Pelotas Padel', 'Pelotas de padel de alta calidad, diseñadas para asegurar un rendimiento superior en cada partido.', 'Hechas con materiales de alta calidad, estas pelotas son duraderas y mantienen su consistencia en la cancha, asegurando un juego excelente.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para jugadores de todos los niveles.', 'Modelo-23', 'S', 74.99, 0, 4, 5, 4),
('REF-6058', 'Advance Pantalones Futbol', 'Pantalones diseñados para fútbol, ideales para mantener la comodidad y libertad de movimiento durante el juego.', 'Estos pantalones cuentan con un material de alta tecnología que favorece el rendimiento de los futbolistas, ofreciendo elasticidad y transpirabilidad.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas de alto rendimiento.', 'Modelo-13', 'XL', 53.0, 0, 1, 2, 1),
('REF-4016', 'Classic Camisetas Baloncesto', 'Camisetas de baloncesto diseñadas para ofrecer una comodidad óptima durante el juego.', 'Fabricadas con materiales ligeros y transpirables, estas camisetas ayudan a mantener el cuerpo fresco y cómodo durante los partidos intensos.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto.', 'Modelo-33', 'L', 99.06, 0, 2, 1, 2),
('REF-7569', 'Pro Pantalones Futbol', 'Pantalones profesionales para fútbol, hechos para proporcionar soporte y libertad de movimiento en el campo.', 'Estos pantalones cuentan con un diseño ergonómico y materiales técnicos que favorecen el rendimiento, permitiendo movimientos ágiles y rápidos.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas profesionales.', 'Modelo-42', 'M', 145.33, 0, 5, 2, 1),
('REF-2128', 'Elite Balones Futbol', 'Balones de fútbol de alta calidad, ideales para entrenamientos y partidos.', 'Fabricados con materiales resistentes que garantizan durabilidad y un rendimiento excepcional en todos los tipos de terreno, estos balones son perfectos para cualquier futbolista.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para futbolistas de alto nivel.', 'Modelo-35', 'M', 89.02, 0, 1, 4, 1),
('REF-1913', 'Advance Accesorios Baloncesto', 'Accesorios especializados para baloncesto, diseñados para mejorar el rendimiento de los jugadores.', 'Estos accesorios cuentan con un diseño funcional y materiales de alta calidad, optimizando la comodidad y protección durante los entrenamientos o partidos de baloncesto.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto.', 'Modelo-31', 'L', 43.16, 0, 4, 5, 2),
('REF-2751', 'Pro Pantalones Running', 'Pantalones diseñados específicamente para correr, con materiales que ofrecen comodidad y ligereza durante las carreras.', 'Estos pantalones permiten una total libertad de movimiento, son resistentes y perfectos para corredores que buscan optimizar su rendimiento en cada kilómetro.', 'Disponible en varios tamaños y colores. Producto garantizado para corredores de alto rendimiento.', 'Modelo-27', 'M', 111.21, 0, 1, 2, 3),
('REF-3165', 'Pro Pantalones Futbol', 'Pantalones deportivos diseñados para futbolistas que buscan agilidad y confort en sus movimientos.', 'Hechos con materiales flexibles y transpirables, estos pantalones aseguran un ajuste perfecto y libertad de movimiento durante el juego.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de fútbol profesionales.', 'Modelo-27', 'L', 109.35, 0, 3, 2, 1),
('REF-2322', 'Advance Pantalones Futbol', 'Pantalones diseñados para futbolistas que buscan máximo confort y transpirabilidad.', 'Este artículo permite un ajuste cómodo y proporciona una gran flexibilidad para movimientos rápidos, ideal para partidos largos.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas que exigen lo mejor.', 'Modelo-47', 'L', 21.47, 0, 3, 2, 1),
('REF-4467', 'Xtreme Zapatillas Futbol', 'Zapatillas diseñadas para futbolistas que necesitan velocidad y tracción en cada movimiento.', 'Con un diseño de última tecnología, estas zapatillas ofrecen soporte y un excelente control de la pelota en cualquier terreno de juego.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores profesionales de fútbol.', 'Modelo-4', 'XL', 122.66, 0, 1, 3, 1),
('REF-8797', 'Elite Balones Baloncesto', 'Balones de baloncesto de alta calidad, ideales para partidos y entrenamientos.', 'Estos balones están hechos con materiales duraderos, ofreciendo una excelente respuesta y control durante el juego en la cancha de baloncesto.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto de todos los niveles.', 'Modelo-19', 'XL', 57.26, 0, 1, 4, 2),
('REF-9879', 'Classic Balones Baloncesto', 'Balones diseñados específicamente para baloncesto, garantizando una experiencia óptima en cada rebote.', 'Este balón cuenta con una construcción robusta que asegura durabilidad y un excelente control para los jugadores de baloncesto.', 'Disponible en varios tamaños y colores. Producto garantizado, ideal para partidos de baloncesto.', 'Modelo-43', 'S', 67.15, 0, 4, 4, 2),
('REF-8540', 'Xtreme Camisetas Running', 'Camisetas diseñadas para corredores, fabricadas con materiales técnicos que favorecen la transpirabilidad y comodidad durante las carreras.', 'Estas camisetas ligeras permiten mantener el cuerpo fresco y libre de incomodidades durante la práctica de running.', 'Disponible en varios tamaños y colores. Producto garantizado para corredores de todos los niveles.', 'Modelo-30', 'L', 133.27, 0, 1, 1, 3),
('REF-9854', 'Pro Accesorios Futbol', 'Accesorios de fútbol diseñados para optimizar el rendimiento y confort de los futbolistas.', 'Fabricados con materiales de alta calidad, estos accesorios aseguran un ajuste perfecto y soporte durante el juego, mejorando el rendimiento de cada jugador.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas profesionales.', 'Modelo-47', 'L', 81.61, 0, 5, 5, 1),
('REF-3177', 'Pro Pantalones Running', 'Pantalones diseñados para runners que buscan ligereza y confort durante largas carreras.', 'Estos pantalones se caracterizan por su ajuste perfecto y su tela de alta tecnología, que favorece la transpirabilidad y la flexibilidad.', 'Disponible en varios tamaños y colores. Producto garantizado para corredores de todos los niveles.', 'Modelo-26', 'S', 68.86, 0, 4, 2, 3),
('REF-3088', 'Xtreme Camisetas Futbol', 'Camisetas de fútbol que ofrecen gran comodidad y un excelente ajuste, ideales para los partidos más intensos.', 'Estas camisetas son de material ligero y transpirable, lo que las hace perfectas para el rendimiento máximo en la cancha de fútbol.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas profesionales.', 'Modelo-46', 'XL', 45.47, 0, 2, 1, 1),
('REF-9411', 'Advance Zapatillas Futbol', 'Zapatillas diseñadas para futbolistas que necesitan control y comodidad durante el juego.', 'Estas zapatillas ofrecen una excelente tracción y soporte para jugadores que practican fútbol en cualquier tipo de terreno.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas profesionales.', 'Modelo-7', 'XL', 186.48, 0, 3, 3, 1),
('REF-2579', 'Advance Zapatillas Tenis', 'Zapatillas diseñadas para el tenis, proporcionando soporte y comodidad durante cada partido.', 'Estas zapatillas ofrecen un ajuste perfecto y una gran estabilidad, diseñadas para optimizar el rendimiento en la cancha de tenis.', 'Disponible en varios tamaños y colores. Producto garantizado para tenistas profesionales.', 'Modelo-49', 'L', 167.64, 0, 5, 3, 5),
('REF-5010', 'Elite Accesorios Baloncesto', 'Accesorios diseñados para baloncesto, pensados para mejorar el rendimiento y la comodidad de los jugadores.', 'Hechos con materiales de calidad que garantizan durabilidad y soporte durante los partidos o entrenamientos de baloncesto.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto de alto nivel.', 'Modelo-40', 'XL', 102.29, 0, 1, 5, 2),
('REF-7170', 'Xtreme Zapatillas Running', 'Zapatillas para running que ofrecen una excelente amortiguación y estabilidad durante las carreras.', 'Estas zapatillas proporcionan confort y resistencia, ideales para corredores que buscan maximizar su rendimiento en largas distancias.', 'Disponible en varios tamaños y colores. Producto garantizado para corredores de todos los niveles.', 'Modelo-36', 'M', 64.25, 0, 4, 3, 3),
('REF-5189', 'Xtreme Palas Padel', 'Palas de pádel diseñadas para brindar un control y potencia excepcionales en cada golpe.', 'Hechas con materiales de última tecnología, estas palas ofrecen un rendimiento superior para jugadores avanzados de pádel.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de pádel de alto nivel.', 'Modelo-10', 'S', 190.29, 0, 1, 4, 4),
('REF-3849', 'Advance Balones Baloncesto', 'Balones de baloncesto de alta calidad, perfectos para partidos o entrenamientos intensos.', 'Estos balones están fabricados para mantener su forma y resistencia, permitiendo un control superior en la cancha.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto.', 'Modelo-41', 'S', 84.06, 0, 5, 4, 2),
('REF-7682', 'Elite Camisetas Baloncesto', 'Camisetas de baloncesto con diseño ergonómico, ideales para proporcionar comodidad y libertad de movimiento.', 'Hechas con un material transpirable, estas camisetas aseguran que el jugador se mantenga fresco y cómodo durante el juego.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto.', 'Modelo-48', 'M', 25.74, 0, 1, 1, 2),
('REF-3253', 'Classic Pantalones Running', 'Pantalones diseñados para corredores, ofreciendo una gran libertad de movimiento y confort durante las carreras.', 'Estos pantalones cuentan con una tela ligera y flexible que favorece la transpiración y el ajuste perfecto.', 'Disponible en varios tamaños y colores. Producto garantizado para runners de todos los niveles.', 'Modelo-31', 'XL', 194.11, 0, 1, 2, 3),
('REF-6468', 'Advance Camisetas Baloncesto', 'Camisetas de baloncesto que combinan ligereza y transpirabilidad, diseñadas para jugadores de alto rendimiento.', 'Con un diseño especial que mejora la comodidad durante los entrenamientos o partidos, estas camisetas aseguran máxima frescura y libertad de movimiento.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto profesionales.', 'Modelo-10', 'L', 139.24, 0, 5, 1, 2),
('REF-7281', 'Classic Accesorios Baloncesto', 'Accesorios ideales para baloncesto, diseñados para mejorar el rendimiento y proteger al jugador durante el juego.', 'Estos accesorios son perfectos para jugadores que buscan comodidad, resistencia y soporte en cada partido de baloncesto.', 'Disponible en varios tamaños y colores. Producto garantizado para jugadores de baloncesto.', 'Modelo-9', 'L', 109.15, 0, 1, 5, 2),
('REF-9503', 'Pro Accesorios Running', 'Accesorios para runners que mejoran el confort y rendimiento durante las carreras.', 'Hechos con materiales de alta calidad, estos accesorios optimizan el soporte y la transpirabilidad, asegurando que el corredor se sienta cómodo en todo momento.', 'Disponible en varios tamaños y colores. Producto garantizado para runners de todos los niveles.', 'Modelo-30', 'S', 117.5, 0, 5, 4, 3),
('REF-3630', 'Advance Zapatillas Futbol', 'Zapatillas de fútbol diseñadas para brindar tracción, estabilidad y confort durante los partidos.', 'Estas zapatillas están diseñadas con materiales de alta tecnología, asegurando que el jugador se mueva con rapidez y seguridad en cualquier terreno de juego.', 'Disponible en varios tamaños y colores. Producto garantizado para futbolistas profesionales.', 'Modelo-15', 'XL', 44.99, 0, 5, 3, 1);
('REF-3637', 'Xtreme Pelotas Padel', 'Pelotas de alta resistencia para padel.', 'Estas pelotas están diseñadas especialmente para el pádel, ofreciendo un rendimiento excepcional en cada golpe. Son ideales para jugadores que buscan calidad y durabilidad.', 'Fabricadas con materiales premium para garantizar la máxima durabilidad y estabilidad. Disponible en varias combinaciones de colores.', 'Modelo-41', 'L', 145.26, 0, 1, 5, 4),
('REF-8146', 'Advance Zapatillas Running', 'Zapatillas de running ultraligeras y cómodas.', 'Estas zapatillas están diseñadas para proporcionar el máximo confort y soporte durante tus carreras. Perfectas para corredores que buscan velocidad y resistencia.', 'Con tecnología avanzada de amortiguación y diseño aerodinámico, son ideales para largas distancias y entrenamientos intensos.', 'Modelo-24', 'S', 71.27, 0, 2, 3, 3),
('REF-4212', 'Xtreme Accesorios Baloncesto', 'Accesorios de baloncesto de alta calidad.', 'Estos accesorios están diseñados para optimizar tu rendimiento en la cancha, proporcionando mayor control y comodidad. Ideal para jugadores de baloncesto de cualquier nivel.', 'Incluye accesorios como muñequeras, rodilleras y más, todos fabricados con materiales resistentes y ligeros. Disponible en diferentes tamaños y colores.', 'Modelo-26', 'M', 195.12, 0, 3, 5, 2),
('REF-9777', 'Elite Zapatillas Futbol', 'Zapatillas de fútbol con gran tracción.', 'Diseñadas para ofrecer un excelente agarre en cualquier tipo de campo, estas zapatillas de fútbol son ideales para jugadores que buscan velocidad y estabilidad en cada jugada.', 'Su diseño innovador incluye una suela de alta tracción y un sistema de amortiguación para mayor comodidad durante los partidos más intensos.', 'Modelo-27', 'XL', 124.22, 0, 4, 3, 1),
('REF-1814', 'Advance Accesorios Running', 'Accesorios ideales para runners.', 'Mejora tu rendimiento con nuestros accesorios especialmente diseñados para corredores. Perfectos para protegerte y ayudarte a concentrarte en cada paso.', 'Estos accesorios incluyen cintas para la cabeza, bolsas para correr y más, todos con tejidos transpirables y materiales de alta calidad.', 'Modelo-13', 'S', 164.32, 0, 3, 4, 3),
('REF-5407', 'Elite Pantalones Tenis', 'Pantalones diseñados para tenis de alto rendimiento.', 'Con un diseño cómodo y de alta elasticidad, estos pantalones están hechos para ofrecerte la mayor libertad de movimiento durante tus partidos de tenis.', 'Hechos con tejidos que permiten transpiración, garantizando comodidad durante tus entrenamientos o competiciones.', 'Modelo-28', 'XL', 130.92, 0, 2, 2, 5),
('REF-6161', 'Classic Balones Futbol', 'Balones de fútbol de calidad profesional.', 'Estos balones están diseñados para partidos de fútbol intensos, con una excelente resistencia y control durante el juego. Aprobados por varias ligas profesionales.', 'Con una superficie de alta calidad que mejora el agarre y la precisión de cada pase y disparo. Disponible en varios tamaños.', 'Modelo-34', 'M', 152.97, 0, 3, 4, 1),
('REF-6089', 'Xtreme Balones Futbol', 'Balón de fútbol de última generación.', 'Balón diseñado para ofrecer el máximo rendimiento en el campo, proporcionando un vuelo estable y un control excepcional.', 'Hecho con materiales avanzados que garantizan durabilidad y resistencia en cada partido. Ideal para jugadores de fútbol profesional.', 'Modelo-29', 'XL', 189.18, 0, 5, 4, 1),
('REF-7906', 'Classic Camisetas Running', 'Camisetas deportivas para running.', 'Esta camiseta ligera y transpirable está diseñada para ofrecerte comodidad durante tus carreras largas o entrenamientos intensos.', 'Fabricada con tecnología de absorción de sudor para mantenerte seco, y disponible en varios colores y tallas.', 'Modelo-39', 'XL', 163.98, 0, 1, 1, 3),
('REF-5824', 'Advance Balones Futbol', 'Balones de fútbol de alta calidad.', 'Diseñados para un rendimiento superior, estos balones son perfectos para entrenamientos y partidos profesionales de fútbol.', 'Hechos con materiales resistentes que soportan el impacto del juego, manteniendo su forma y durabilidad. Disponible en varios tamaños.', 'Modelo-32', 'XL', 115.15, 0, 1, 4, 1),
('REF-7428', 'Classic Accesorios Padel', 'Accesorios de pádel de alto rendimiento.', 'Accesorios especializados para jugadores de pádel que buscan mejorar su rendimiento y confort en la cancha.', 'Con un diseño ergonómico y materiales de calidad superior para garantizar mayor resistencia y durabilidad en cada uso.', 'Modelo-39', 'L', 194.94, 0, 5, 6, 4),
('REF-1419', 'Elite Balones Futbol', 'Balón de fútbol profesional.', 'Este balón de fútbol está hecho para soportar el juego más intenso, proporcionando un excelente control y precisión.', 'Con una superficie texturizada que mejora el agarre y la estabilidad, ideal para todo tipo de condiciones de campo.', 'Modelo-38', 'XL', 26.36, 0, 5, 4, 1),
('REF-5056', 'Classic Zapatillas Baloncesto', 'Zapatillas ideales para baloncesto.', 'Zapatillas de baloncesto diseñadas para proporcionar estabilidad, confort y tracción en el campo, para un rendimiento óptimo en cada jugada.', 'Con una suela antideslizante y un diseño flexible que favorece el movimiento rápido, son perfectas para jugadores de todos los niveles.', 'Modelo-46', 'S', 122.12, 0, 2, 3, 2),
('REF-4914', 'Elite Palas Tenis', 'Palas de tenis de alto rendimiento.', 'Estas palas están hechas para jugadores exigentes que buscan poder, control y precisión en cada golpe.', 'Hechas con materiales avanzados que mejoran la resistencia y la estabilidad, ideales para entrenamientos y partidos competitivos.', 'Modelo-3', 'XL', 154.37, 0, 5, 4, 5),
('REF-5105', 'Pro Accesorios Baloncesto', 'Accesorios profesionales para baloncesto.', 'Accesorios diseñados para protegerte durante el juego y mejorar tu rendimiento en la cancha, ideales para entrenamientos o partidos de competición.', 'Con soportes ajustables, muñequeras, y rodilleras que proporcionan máxima comodidad y protección durante el juego.', 'Modelo-13', 'S', 76.66, 0, 3, 5, 2),
('REF-3714', 'Classic Pelotas Padel', 'Pelotas de pádel de alto rendimiento.', 'Estas pelotas están fabricadas para ofrecer una excelente durabilidad y consistencia en cada golpe, perfectas para jugadores de pádel de alto nivel.', 'Diseñadas para mantener su forma y su rebote en cualquier condición de cancha, ideales para competiciones profesionales.', 'Modelo-20', 'XL', 145.0, 0, 4, 5, 4),
('REF-8027', 'Pro Zapatillas Running', 'Zapatillas de running de alto rendimiento.', 'Zapatillas diseñadas para maximizar el rendimiento en carreras largas y entrenamientos intensos. Ofrecen gran comodidad y estabilidad.', 'Con una suela de goma de alta tracción y un diseño ligero, ideales para corredores profesionales y entusiastas del running.', 'Modelo-47', 'XL', 147.52, 0, 1, 3, 3),
('REF-5708', 'Elite Camisetas Padel', 'Camiseta técnica para pádel.', 'Camiseta transpirable de alta tecnología, diseñada para mantenerte fresco y cómodo durante todo el partido de pádel.', 'Con una tela que absorbe el sudor, ofreciendo mayor comodidad en los momentos de mayor actividad en la cancha. Disponible en varios colores.', 'Modelo-38', 'L', 179.0, 0, 2, 1, 4);

-- TABLA TIENDA
INSERT INTO tienda (nombre, direccion, email, web, telefono) VALUES 
('Tienda Online', 'online', 'sportive@gmail.com', 'www.sportive.com', '965 65 43 21'),
('Sportive Alicante', 'Calle Mayor, 12', 'sportiveAlicante@gmail.com', 'www.sportive.com', '965 43 21 65'),
('Sportive Valencia', 'Calle Mayor, 12', 'sportiveValencia@gmail.com', 'www.sportive.com', '960 43 21 65'),
('Sportive Murcia', 'Calle Mayor, 12', 'sportiveMurcia@gmail.com', 'www.sportive.com', '968 43 21 65'),
('Sportive Castellón', 'Calle Mayor, 12', 'sportiveCastellon@gmail.com', 'www.sportive.com', '964 43 21 65');

-- TABLA EXISTENCIAS
INSERT INTO existencias (id_tienda, id_articulo, cantidad)
SELECT tienda.id, articulo.id, 500
FROM tienda, articulo
WHERE tienda.id = 1;

INSERT INTO existencias (id_tienda, id_articulo, cantidad)
SELECT tienda.id, articulo.id, 50
FROM tienda, articulo
WHERE tienda.id = 2;

INSERT INTO existencias (id_tienda, id_articulo, cantidad)
SELECT tienda.id, articulo.id, 50
FROM tienda, articulo
WHERE tienda.id = 3;

INSERT INTO existencias (id_tienda, id_articulo, cantidad)
SELECT tienda.id, articulo.id, 50
FROM tienda, articulo
WHERE tienda.id = 4;

INSERT INTO existencias (id_tienda, id_articulo, cantidad)
SELECT tienda.id, articulo.id, 50
FROM tienda, articulo
WHERE tienda.id = 5;

-- TABLA CLIENTE
INSERT INTO cliente (email, clave, nombre, apellidos, telefono, postal, rol) VALUES
('admin@gmail.com', 'admin', 'Nombre', 'Apellidos', '123-456-7890', '12345', 'admin'),
('john.doe1@example.com', 'P@ssw0rd123', 'John', 'Doe', '123-456-7890', '12345', 'cliente'),
('jane.smith2@example.com', 'SecurePass456!', 'Jane', 'Smith', '987-654-3210', '54321', 'cliente'),
('alex.jones3@example.com', 'Password789$', 'Alex', 'Jones', '555-123-4567', '67890', 'cliente'),
('lisa.brown4@example.com', 'MyP@ssw0rd!', 'Lisa', 'Brown', '444-987-6543', '11223', 'cliente'),
('mike.davis5@example.com', 'PassWord2024#', 'Mike', 'Davis', '222-333-4444', '33445', 'cliente'),
('susan.clark6@example.com', 'SuperPass456!', 'Susan', 'Clark', '777-888-9999', '99887', 'cliente'),
('robert.white7@example.com', 'QwErTyUiOp123', 'Robert', 'White', '666-555-4444', '55443', 'cliente'),
('nancy.green8@example.com', 'Complex#Pass987', 'Nancy', 'Green', '111-222-3333', '66778', 'cliente'),
('david.hall9@example.com', 'SafePass321!', 'David', 'Hall', '999-888-7777', '77889', 'cliente'),
('emma.taylor10@example.com', 'RandomPass654$', 'Emma', 'Taylor', '333-444-5555', '88900', 'cliente');

-- TABLA CARRITO
INSERT INTO carrito (cliente_id, articulo_cod, cantidad) VALUES
(2, 12, 3),
(2, 99, 2),
(3, 34, 4),
(3, 56, 1),
(3, 87, 6),
(4, 22, 3),
(4, 63, 2),
(5, 9, 4),
(5, 31, 3),
(5, 77, 5),
(6, 50, 2),
(6, 88, 1),
(7, 15, 3),
(7, 72, 2),
(8, 44, 4),
(8, 11, 3),
(9, 67, 1),
(9, 33, 5),
(10, 5, 2),
(10, 40, 3)
(11, 3, 2),
(11, 45, 5),
(11, 78, 1);

-- TABLA LISTA_DESEOS
INSERT INTO lista_deseos (cliente_id, articulo_cod) VALUES
(1, 12),
(1, 45),
(2, 78),
(2, 9),
(2, 34),
(3, 22),
(3, 63),
(4, 50),
(4, 15),
(5, 72),
(5, 44),
(6, 11),
(6, 67),
(7, 33),
(7, 5),
(8, 40),
(8, 3),
(9, 56),
(9, 87),
(10, 99),
(10, 31);

-- Insertar comentarios en la tabla comentario
INSERT INTO comentario (comentario, articulo_cod, cliente_id) VALUES
('Muy buen producto, lo recomiendo!', 3, 11),
('La calidad es excelente, vale cada centavo.', 45, 2),
('El artículo llegó antes de tiempo y en perfecto estado.', 12, 3),
('El diseño es muy moderno y funcional.', 78, 4),
('El producto no cumplió con mis expectativas.', 9, 5),
('Es justo lo que estaba buscando, gracias!', 34, 6),
('El precio es competitivo y la calidad es buena.', 22, 7),
('Llegó con algunos defectos, pero el servicio fue rápido.', 56, 8),
('La descripción del producto es precisa, estoy satisfecho.', 88, 9),
('Gran compra, definitivamente volveré a comprar aquí.', 50, 10),
('El envío fue rápido, pero el embalaje podría mejorar.', 15, 11),
('Excelente atención al cliente, resolvieron mis dudas rápido.', 72, 2),
('El material es de buena calidad, lo recomendaría.', 44, 3),
('Me sorprendió lo bien que funciona, muy contento.', 11, 4),
('No esperaba mucho por el precio, pero fue una grata sorpresa.', 67, 5),
('Muy bonito, pero no es tan resistente como esperaba.', 33, 6),
('Es un buen producto, pero el color no es como en las fotos.', 5, 7),
('Cumple con lo prometido, nada más que decir.', 40, 8),
('La relación calidad-precio es fantástica.', 31, 9),
('Fue un regalo, y a la persona le encantó.', 99, 10),
('Muy buen producto, lo recomiendo mucho.', 2, 3),
('El artículo llegó rápidamente y en excelente estado.', 55, 4),
('No me ha convencido, esperaba más por el precio.', 29, 5),
('Excelente calidad, me sorprendió gratamente.', 68, 6),
('El producto es exactamente lo que buscaba, muy satisfecho.', 27, 7),
('El color es un poco diferente, pero sigue siendo bonito.', 10, 8),
('Perfecto para mi uso diario, lo recomendaría.', 42, 9),
('Llegó en buen estado, pero el embalaje podría mejorar.', 17, 10),
('No es tan resistente como esperaba, pero aún así está bien.', 21, 11),
('La calidad es buena, pero el tamaño no era el que esperaba.', 39, 2),
('El producto cumple su función, pero el precio es un poco alto.', 61, 3),
('Estaba dudoso, pero me ha encantado, gran compra.', 19, 4),
('El servicio de atención al cliente fue muy bueno y rápido.', 33, 5),
('Me gustó mucho, pero el color no es tan vibrante como en la foto.', 73, 6),
('Excelente relación calidad-precio, muy recomendable.', 24, 7),
('El envío fue muy rápido, y el artículo es de buena calidad.', 58, 8),
('El artículo tiene una gran calidad, pero el tamaño no es adecuado para mí.', 49, 9),
('El producto está bien, aunque esperaba una mejor durabilidad.', 13, 10),
('Lo recomiendo al 100%, buen artículo y buen precio.', 32, 11),
('El diseño es excelente, me encanta cómo queda en mi casa.', 61, 2),
('Muy bonito, aunque llegó un poco tarde.', 76, 3),
('La calidad es espectacular, pero no me gustó el tamaño.', 20, 4),
('La descripción es precisa, pero la calidad no es tan buena como esperaba.', 4, 5),
('Excelente compra, se ajusta perfectamente a mis necesidades.', 38, 6),
('Cumple con todo lo prometido, muy satisfecho con la compra.', 65, 7),
('El artículo llegó en perfectas condiciones y dentro del plazo de entrega.', 8, 8),
('Me ha encantado, el precio es razonable y la calidad es buena.', 57, 9),
('Excelente compra, volveré a comprar sin duda.', 46, 10),
('El producto es bueno, pero la entrega fue más lenta de lo esperado.', 1, 11),
('El artículo es tal como se describe, estoy muy contento con la compra.', 26, 2),
('No me ha convencido, el artículo no es tan bueno como pensaba.', 64, 3),
('Un buen producto, pero el tamaño es un poco pequeño para lo que necesitaba.', 71, 4),
('Muy buen producto, fácil de usar y de excelente calidad.', 12, 2),
('El artículo llegó bien, aunque un poco tarde.', 46, 3),
('La calidad es increíble, no me arrepiento de la compra.', 57, 4),
('El tamaño no es el que esperaba, pero sigue siendo útil.', 81, 5),
('Perfecto para lo que necesitaba, gran compra.', 29, 6),
('Muy bonito, pero un poco más caro de lo que esperaba.', 17, 7),
('Lo recomiendo totalmente, es justo lo que buscaba.', 54, 8),
('El envío fue un poco lento, pero el artículo está bien.', 82, 9),
('Buen producto, aunque el color no es exactamente como en las fotos.', 23, 10),
('Es un buen producto por el precio, aunque no es perfecto.', 35, 11),
('Muy buen diseño, aunque el material no es tan resistente como esperaba.', 76, 2),
('El producto llegó en perfectas condiciones, pero la caja estaba dañada.', 40, 3),
('La calidad es excelente, aunque un poco costoso.', 52, 4),
('El artículo no cumplió con mis expectativas, lo devolveré.', 93, 5),
('Me gusta mucho, pero me gustaría que tuviera más opciones de color.', 66, 6),
('Es exactamente lo que esperaba, excelente compra.', 51, 7),
('Me sorprendió la calidad por el precio, muy buen producto.', 60, 8),
('El artículo no es tan grande como parece en las fotos, pero aún está bien.', 79, 9),
('Muy satisfecho con la compra, lo recomendaría a otros.', 49, 10),
('Buena relación calidad-precio, pero la entrega fue lenta.', 25, 11),
('El artículo es de buena calidad, pero no es tan cómodo como pensaba.', 71, 2),
('El servicio al cliente fue rápido y resolvió mis dudas, muy satisfecho.', 39, 3),
('Cumple su función, pero esperaba mejor durabilidad.', 88, 4),
('Buen producto, aunque el diseño podría ser mejor.', 33, 5),
('Me ha gustado, pero llegó un poco sucio.', 45, 6),
('El producto es bueno, aunque el tamaño no es el ideal para mí.', 58, 7),
('No me convenció, esperaba más por el precio.', 37, 8),
('Me encantó el producto, cumple con todo lo que promete.', 66, 9),
('Excelente artículo, aunque el embalaje no fue el mejor.', 72, 10),
('La calidad es buena, pero llegó con algunos rayones.', 20, 11),
('Me encanta el diseño, pero no es tan fácil de usar como esperaba.', 48, 2),
('Muy buen producto, lo seguiré comprando.', 10, 3),
('El producto es bueno, aunque el color no me gustó mucho.', 59, 4);

-- Insertando 20 pedidos
INSERT INTO pedido (fecha, importe, modo_entrega, gastos_envio, estado, cliente_id, tienda_id)
VALUES 
('2024-12-01', 372.58, 'envio', 15.00, 'procesando', 3, 1),
('2024-12-02', 258.90, 'envio', 12.00, 'enviado', 5, 1),
('2024-12-03', 489.45, 'envio', 18.50, 'entregado', 8, 1),
('2024-12-04', 124.75, 'envio', 10.00, 'procesando', 7, 1),
('2024-12-05', 736.18, 'envio', 20.00, 'entregado', 4, 1),
('2024-12-06', 289.35, 'envio', 15.50, 'enviado', 2, 1),
('2024-12-07', 115.60, 'envio', 8.50, 'procesando', 6, 1),
('2024-12-08', 561.12, 'envio', 17.00, 'entregado', 10, 1),
('2024-12-09', 451.20, 'envio', 16.00, 'enviado', 3, 1),
('2024-12-10', 320.48, 'envio', 14.50, 'procesando', 9, 1),
('2024-12-11', 513.75, 'envio', 19.00, 'entregado', 5, 1),
('2024-12-12', 467.40, 'envio', 15.80, 'enviado', 8, 1),
('2024-12-13', 235.67, 'envio', 9.50, 'procesando', 6, 1),
('2024-12-14', 527.60, 'envio', 18.00, 'entregado', 4, 1),
('2024-12-15', 613.95, 'envio', 20.00, 'enviado', 7, 1),
('2024-12-16', 372.99, 'envio', 12.75, 'procesando', 2, 1),
('2024-12-17', 341.23, 'envio', 13.50, 'enviado', 3, 1),
('2024-12-18', 468.55, 'envio', 16.20, 'entregado', 10, 1),
('2024-12-19', 526.80, 'envio', 14.00, 'procesando', 9, 1),
('2024-12-20', 602.34, 'envio', 18.30, 'enviado', 5, 1);

-- TABLA PEDIDO
INSERT INTO pedido (fecha, importe, modo_entrega, gastos_envio, estado, cliente_id, tienda_id)
VALUES 
('2024-12-01', 372.58, 'envio', 15.00, 'procesando', 3, 1),
('2024-12-02', 258.90, 'envio', 12.00, 'enviado', 5, 1),
('2024-12-03', 489.45, 'envio', 18.50, 'entregado', 8, 1),
('2024-12-04', 124.75, 'envio', 10.00, 'procesando', 7, 1),
('2024-12-05', 736.18, 'envio', 20.00, 'entregado', 4, 1),
('2024-12-06', 289.35, 'envio', 15.50, 'enviado', 2, 1),
('2024-12-07', 115.60, 'envio', 8.50, 'procesando', 6, 1),
('2024-12-08', 561.12, 'envio', 17.00, 'entregado', 10, 1),
('2024-12-09', 451.20, 'envio', 16.00, 'enviado', 3, 1),
('2024-12-10', 320.48, 'envio', 14.50, 'procesando', 9, 1),
('2024-12-11', 513.75, 'envio', 19.00, 'entregado', 5, 1),
('2024-12-12', 467.40, 'envio', 15.80, 'enviado', 8, 1),
('2024-12-13', 235.67, 'envio', 9.50, 'procesando', 6, 1),
('2024-12-14', 527.60, 'envio', 18.00, 'entregado', 4, 1),
('2024-12-15', 613.95, 'envio', 20.00, 'enviado', 7, 1),
('2024-12-16', 372.99, 'envio', 12.75, 'procesando', 2, 1),
('2024-12-17', 341.23, 'envio', 13.50, 'enviado', 3, 1),
('2024-12-18', 468.55, 'envio', 16.20, 'entregado', 10, 1),
('2024-12-19', 526.80, 'envio', 14.00, 'procesando', 9, 1),
('2024-12-20', 602.34, 'envio', 18.30, 'enviado', 5, 1);

-- TABLA LIN_PED
INSERT INTO lin_ped (pedido_id, articulo_cod, cantidad, precio)
VALUES
(1, 12, 2, 60.50),
(1, 30, 1, 251.58),
(1, 56, 3, 30.25),
(2, 23, 1, 89.00),
(2, 54, 2, 85.45),
(2, 71, 1, 84.45),
(3, 7, 4, 74.50),
(3, 15, 2, 142.90),
(3, 45, 3, 68.30),
(4, 11, 2, 62.75),
(4, 33, 1, 32.00),
(4, 61, 3, 30.00),
(5, 17, 3, 122.00),
(5, 28, 4, 154.18),
(5, 50, 2, 95.00),
(6, 10, 2, 120.00),
(6, 35, 1, 69.35),
(6, 61, 2, 100.00),
(7, 22, 3, 38.60),
(7, 36, 1, 42.50),
(7, 65, 2, 34.50),
(8, 3, 1, 195.50),
(8, 42, 2, 172.62),
(8, 59, 3, 193.00),
(9, 4, 2, 99.20),
(9, 37, 1, 122.20),
(9, 51, 1, 60.00),
(10, 5, 3, 111.30),
(10, 26, 2, 129.18),
(10, 70, 3, 140.00),
(11, 14, 1, 110.00),
(11, 19, 2, 131.10),
(11, 44, 2, 122.40),
(12, 8, 1, 245.75),
(12, 30, 2, 137.10),
(12, 46, 2, 107.10),
(13, 27, 3, 52.00),
(13, 39, 1, 61.67),
(13, 50, 3, 122.00),
(14, 9, 1, 185.50),
(14, 33, 2, 142.10),
(14, 57, 1, 200.00),
(15, 13, 2, 100.40),
(15, 18, 3, 94.00),
(15, 66, 1, 181.90),
(16, 22, 2, 74.25),
(16, 27, 1, 84.50),
(16, 49, 3, 58.00),
(17, 11, 1, 112.00),
(17, 31, 3, 102.30),
(17, 64, 2, 135.00),
(18, 17, 2, 78.50),
(18, 45, 3, 104.00),
(18, 56, 2, 98.60),
(19, 2, 3, 100.00),
(19, 40, 1, 182.50),
(19, 53, 3, 128.00),
(20, 12, 3, 98.30),
(20, 14, 2, 115.90),
(20, 60, 1, 148.50);
