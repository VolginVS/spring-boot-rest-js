package ru.volginvs.springbootrestjs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.volginvs.springbootrestjs.dto.RoleDTO;
import ru.volginvs.springbootrestjs.dto.UserDTO;
import ru.volginvs.springbootrestjs.mapper.RoleMapper;
import ru.volginvs.springbootrestjs.mapper.UserMapper;
import ru.volginvs.springbootrestjs.model.Role;
import ru.volginvs.springbootrestjs.model.User;
import ru.volginvs.springbootrestjs.service.RoleService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles/")
@CrossOrigin(origins = "http://localhost:8080")
public class RoleRestController {

    private RoleService roleService;

    @Autowired
    public RoleRestController(RoleService roleService) {
        this.roleService = roleService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<RoleDTO>> getAllRoles() {
        Set<Role> roles = this.roleService.getAllRoles();

        if(roles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

            List<RoleDTO> rolesDTO = roles.stream()
                .map(role -> RoleMapper.ROLE_MAPPER_INSTANCE.toDTO(role))
                .collect(Collectors.toList());
        return new ResponseEntity<>(rolesDTO, HttpStatus.OK);
    }
}
//    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public ResponseEntity<List<UserDTO>> getAllUsers() {
//        List<User> users = this.userService.getAll();
//
//        if (users.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        List<UserDTO> usersDTO =users.stream()
//                .map(user -> UserMapper.USER_MAPPER_INSTANCE.toDTO(user))
//                .collect(Collectors.toList());
//        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
//    }