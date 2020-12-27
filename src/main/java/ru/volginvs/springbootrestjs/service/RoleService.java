package ru.volginvs.springbootrestjs.service;

import ru.volginvs.springbootrestjs.model.Role;
import ru.volginvs.springbootrestjs.model.User;

import java.util.Set;

public interface RoleService {
    void addRoleToUserByRoleName(User user, String rolename);
    Role getByName(String name);
    Set<Role> getAll();

}
