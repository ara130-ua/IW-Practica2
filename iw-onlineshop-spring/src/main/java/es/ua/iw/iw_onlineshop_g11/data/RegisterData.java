package es.ua.iw.iw_onlineshop_g11.data;

import jakarta.validation.constraints.Email;

public class RegisterData {

    @Email
    private String email;
    private String clave;
    private String nombre;
    private String apellidos;
    private String telefono;
    private String postal;

    // Getters y Setters

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getClave(){
        return clave;
    }

    public void setClave(String clave){
        this.clave = clave;
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getApellidos(){
        return apellidos;
    }

    public void setApellidos(String apellidos){
        this.apellidos = apellidos;
    }

    public String getTelefono(){
        return telefono;
    }

    public void setTelefono(String telefono){
        this.telefono = telefono;
    }

    public String getPostal(){
        return postal;
    }

    public void setPostal(String postal){
        this.postal = postal;
    }
}
