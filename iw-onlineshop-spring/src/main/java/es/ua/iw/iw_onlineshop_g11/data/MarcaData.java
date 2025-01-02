package es.ua.iw.iw_onlineshop_g11.data;

import java.util.Objects;

public class MarcaData {

    private long id;
    private String nombre;
    private String descripcion;

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

    public String getDescripcion(){
        return descripcion;
    }

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarcaData)) return false;
        MarcaData marcaData = (MarcaData) o;
        return getId() == marcaData.getId() && getNombre().equals(marcaData.getNombre()) && getDescripcion().equals(marcaData.getDescripcion());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNombre(), getDescripcion());
    }
}
