package es.ua.iw.iw_onlineshop_g11.repository;

import es.ua.iw.iw_onlineshop_g11.model.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface ClienteRepository extends CrudRepository<Cliente, Long> {
    Cliente findByEmail(String email);

}
