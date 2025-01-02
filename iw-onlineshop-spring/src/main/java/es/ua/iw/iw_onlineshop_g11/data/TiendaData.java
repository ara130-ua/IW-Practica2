package es.ua.iw.iw_onlineshop_g11.data;

import java.util.Objects;

public class TiendaData {

    private long id;
    private String nombre;
    private String direccion;
    private String email;
    private String telefono;
    private String web;

    // Getters y Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public String getDireccion(){
        return direccion;
    }

    public void setDireccion(String direccion){
        this.direccion = direccion;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getTelefono(){
        return telefono;
    }

    public void setTelefono(String telefono){
        this.telefono = telefono;
    }

    public String getWeb(){
        return web;
    }

    public void setWeb(String web){
        this.web = web;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TiendaData)) return false;
        TiendaData tienda = (TiendaData) o;
        return getId() == tienda.getId() && Objects.equals(getNombre(), tienda.getNombre()) && Objects.equals(getDireccion(), tienda.getDireccion()) && Objects.equals(getEmail(), tienda.getEmail()) && Objects.equals(getTelefono(), tienda.getTelefono()) && Objects.equals(getWeb(), tienda.getWeb());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}
