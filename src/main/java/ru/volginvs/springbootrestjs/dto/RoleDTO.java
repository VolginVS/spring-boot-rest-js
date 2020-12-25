package ru.volginvs.springbootrestjs.dto;

import java.util.Set;

public class RoleDTO {

    private Long id;
    private String name;
//    private Set<Long> usersId;

    public RoleDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public Set<Long> getUsers() {
//        return usersId;
//    }
//
//    public void setUsers(Set<Long> usersId) {
//        this.usersId = usersId;
//    }

    @Override
    public String toString() {
        return name;
    }
}
