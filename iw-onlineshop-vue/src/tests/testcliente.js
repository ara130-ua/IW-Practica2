import { loginUsuario } from "../repository/cliente.js";

async function testUsuario(){
  const usuario = {
      email: "admin@gmail.com",
      password: "admin"
  };
  const resultado = await loginUsuario(usuario);
  console.log(resultado);

}



testUsuario()
