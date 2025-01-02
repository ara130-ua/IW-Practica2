package es.ua.iw.iw_onlineshop_g11.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

public class Marca implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="nombre")
    @NotNull
    private String nombre;

    // hay que añadir la relación con la tabla articulo
    //@OneToMany(mappedBy = "marca")
    //private List<Articulo> articulos;

    // contructor vacio para JPA
    public Marca() {}

    public Marca(String nombre){
        this.nombre = nombre;
    }

    // Getters y Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Marca)) return false;
        Marca marca = (Marca) o;
        return getId() == marca.getId() && Objects.equals(getNombre(), marca.getNombre());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNombre());
    }

}
