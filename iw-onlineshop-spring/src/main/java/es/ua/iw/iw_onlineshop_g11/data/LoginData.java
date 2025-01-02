package es.ua.iw.iw_onlineshop_g11.data;

import jakarta.validation.constraints.Email;

public class LoginData {

    @Email
    private String email;

    private String clave;

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

}
