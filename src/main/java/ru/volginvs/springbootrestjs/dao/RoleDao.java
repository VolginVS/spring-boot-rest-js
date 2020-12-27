package ru.volginvs.springbootrestjs.dao;

import ru.volginvs.springbootrestjs.model.Role;

import java.util.Set;

public interface RoleDao {

    Role getByName(String name);
    Set<Role> getAll();
}
