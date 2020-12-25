package ru.volginvs.springbootrestjs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import ru.volginvs.springbootrestjs.dto.UserDTO;
import ru.volginvs.springbootrestjs.mapper.UserMapper;
import ru.volginvs.springbootrestjs.model.User;
import ru.volginvs.springbootrestjs.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users/")
@CrossOrigin(origins = "http://localhost:8080")
public class UserRestController {

    private UserService userService;

    @Autowired
    public UserRestController(UserService userService){
        this.userService = userService;
    }

    @RequestMapping(value ="{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> getUsers(@PathVariable("id") Long id){
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userService.getById(id);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Content-Type",
//                "application/json");

        return new ResponseEntity<>(UserMapper.USER_MAPPER_INSTANCE.toDTO(user), HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> saveUsers(@RequestBody @Validated UserDTO userDTO){
        HttpHeaders headers = new HttpHeaders();

        if(userDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User newUser = new User(UserMapper.USER_MAPPER_INSTANCE.toUser(userDTO));
        this.userService.save(newUser);
        return new ResponseEntity<>(userDTO, headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> updateCustomer(@RequestBody @Validated UserDTO userDTO, UriComponentsBuilder builder){
        HttpHeaders headers = new HttpHeaders();
        
        if(userDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userService.update(UserMapper.USER_MAPPER_INSTANCE.toUser(userDTO));
        return new ResponseEntity<>(userDTO, headers, HttpStatus.CREATED);

    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> deleteUser(@PathVariable("id") Long id) {
        User user = this.userService.getById(id);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        this.userService.removeById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = this.userService.getAll();

        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<UserDTO> usersDTO =users.stream()
                .map(user -> UserMapper.USER_MAPPER_INSTANCE.toDTO(user))
                .collect(Collectors.toList());
        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }
}