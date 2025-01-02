package es.ua.iw.iw_onlineshop_g11.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.ua.iw.iw_onlineshop_g11.data.ClienteData;
import es.ua.iw.iw_onlineshop_g11.model.Cliente;
import es.ua.iw.iw_onlineshop_g11.repository.ClienteRepository;

@Service
public class ClienteService {

    Logger logger = LoggerFactory.getLogger(ClienteService.class);

    public enum LoginStatus {
        LOGIN_OK,
        LOGIN_USER_NOT_FOUND,
        LOGIN_ERROR_CLAVE
    }

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public LoginStatus login(String email, String clave){
        logger.info("Login attempt for user: " + email);
        var cliente = clienteRepository.findByEmail(email);
        if (cliente == null){
            logger.info("User not found");
            return LoginStatus.LOGIN_USER_NOT_FOUND;
        }
        if (!cliente.getClave().equals(clave)){
            logger.info("Wrong password");
            return LoginStatus.LOGIN_ERROR_CLAVE;
        }
        logger.info("Login successful");
        return LoginStatus.LOGIN_OK;
    }

    @Transactional
    public ClienteData registrar(ClienteData clienteData){
       Cliente clienteBD = clienteRepository.findByEmail(clienteData.getEmail());
       if(clienteBD != null){
            throw new IllegalArgumentException("El email ya está registrado");
       } else if (clienteData.getEmail() == null){
            throw new IllegalArgumentException("El email no puede ser nulo");
       } else if (clienteData.getClave() == null){
            throw new IllegalArgumentException("La clave no puede ser nula");
       } else if (clienteData.getNombre() == null){
            throw new IllegalArgumentException("El nombre no puede ser nulo");
       } else {
            Cliente cliente = modelMapper.map(clienteData, Cliente.class);
            clienteRepository.save(cliente);
            return modelMapper.map(cliente, ClienteData.class);
       }
    }
}
