package es.ua.iw.iw_onlineshop_g11.model;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="cliente")
public class Cliente implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="email")
    @NotNull
    private String email;

    @Column(name="clave")
    @NotNull
    private String clave;

    @Column(name="nombre")
    @NotNull
    private String nombre;

    @Column(name="apellidos")
    private String apellidos;

    @Column(name="telefono")
    private String telefono;

    @Column(name="postal")
    private String postal;

    @Column(name="rol")
    private String rol;

    // hay que añadir la relación con la tabla Pedido, lista de deseos, carrito y comentario
    //@OneToMany(mappedBy = "cliente")
    //private List<Pedido> pedidos;


    // contructor vacio para JPA
    public Cliente() {}

    public Cliente(String email, String clave, String nombre){
        this.email = email;
        this.clave = clave;
        this.nombre = nombre;
    }

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
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Cliente)) return false;
        return id != 0 && id == (((Cliente) obj).getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    

}
