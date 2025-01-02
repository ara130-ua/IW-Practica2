package es.ua.iw.iw_onlineshop_g11.data;

import java.util.Objects;

// Data Transfer Object para Cliente
public class ClienteData {

    private long id;
    private String email;
    private String clave;
    private String nombre;
    private String apellidos;
    private String telefono;
    private String postal;
    private String rol = "cliente";

    // Getters y Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public String getRol(){
        return rol;
    }

    public void setRol(String rol){
        this.rol = rol;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ClienteData)) return false;
        ClienteData cliente = (ClienteData) o;
        return getId() == cliente.getId() && Objects.equals(getEmail(), cliente.getEmail()) && Objects.equals(getClave(), cliente.getClave()) && Objects.equals(getNombre(), cliente.getNombre()) && Objects.equals(getApellidos(), cliente.getApellidos()) && Objects.equals(getTelefono(), cliente.getTelefono()) && Objects.equals(getPostal(), cliente.getPostal()) && Objects.equals(getRol(), cliente.getRol());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail());
    }

}
