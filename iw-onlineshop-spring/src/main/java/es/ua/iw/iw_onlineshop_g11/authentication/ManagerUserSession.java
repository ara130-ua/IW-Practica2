package es.ua.iw.iw_onlineshop_g11.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpSession;

@Component
public class ManagerUserSession {
    @Autowired
    HttpSession userSession;

    public void setUserSession(Long idUsuario){
        userSession.setAttribute("idUsuario", idUsuario);
    }

    public Long getUserSession(){
        return (Long) userSession.getAttribute("idUsuario");
    }

    public void removeUserSession(){
        userSession.setAttribute("idUsuario", null);
    }
}
