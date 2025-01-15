import mysql from 'mysql'

export var connectionbbdd = mysql.createConnection({
  host: 'localhost',
  user: 'IWTienda',
  password: '3027',
  database: 'iw-tienda',
})

// Connect to the database
connectionbbdd.connect(function (error) {
  if (error) {
    console.log('Error en la conexión con la base de datos: ' + error)
  } else {
    console.log('Conexión correcta con la base de datos.')
  }
})
