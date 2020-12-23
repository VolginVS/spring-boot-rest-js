package ru.volginvs.springbootrestjs.service;

import ru.volginvs.springbootrestjs.model.User;

import java.util.List;

public interface UserService {

    void save(User user);
    User getById(Long id);
    List<User> getAll();
    void update(User user);
    void removeById(Long id);
    User getByUsername(String username);
}
