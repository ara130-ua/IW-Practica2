package es.ua.iw.iw_onlineshop_g11.model;

import java.io.Serializable;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="tienda")
public class Tienda implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="nombre")
    @NotNull
    private String nombre;

    @Column(name="direccion")
    private String direccion;

    @Column(name="email")
    @NotNull
    private String email;

    @Column(name="telefono")
    @NotNull
    private String telefono;

    @Column(name="web")
    private String web;

    // hay que añadir la relación con la tabla articulo y pedido
    //@OneToMany(mappedBy = "tienda")
    //private List<Articulo> articulos;

    // contructor vacio para JPA
    public Tienda() {}

    public Tienda(String nombre, String email, String telefono){
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getWeb() {
        return web;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    //public List<Articulo> getArticulos()

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Tienda)) return false;
        Tienda tienda = (Tienda) o;
        return getId() == tienda.getId() && getNombre().equals(tienda.getNombre()) && getEmail().equals(tienda.getEmail()) && getTelefono().equals(tienda.getTelefono()) && getWeb().equals(tienda.getWeb());
    }

    @Override
    public int hashCode() {
        return Long.hashCode(getId());
    }


}
