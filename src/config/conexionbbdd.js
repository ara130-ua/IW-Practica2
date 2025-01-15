import pkg from 'pg'; // Incompatibilidad
const { Pool } = pkg;


// Configura las credenciales de conexión
export const connectionbbdd = new Pool({
  user: 'postgres.snuzpjwolxlygxasqfwp', // Usuario de la base de datos
  host: 'aws-0-eu-central-1.pooler.supabase.com', // Dirección del host
  database: 'postgres', // Nombre de la base de datos
  password: 'boXzfjOgLtGTwPVp', // Contraseña de la base de datos
  port: 5432, // Puerto (por defecto, 5432)
  });

// Connect to the database
connectionbbdd.connect(function (error) {
  if (error) {
    console.log('Error en la conexión con la base de datos: ' + error)
  } else {
    console.log('Conexión correcta con la base de datos.')
  }
})
