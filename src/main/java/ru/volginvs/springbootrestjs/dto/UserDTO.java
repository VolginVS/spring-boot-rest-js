package ru.volginvs.springbootrestjs.dto;


import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;

public class UserDTO {

    private Long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Byte age;
    private String email;
    private Set<RoleDTO> rolesSet = new LinkedHashSet<>();

    public UserDTO(){

    }

    public UserDTO(String username, String password, String firstName, String lastName,
                Byte age, String email, RoleDTO... roles){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.rolesSet = new LinkedHashSet<>(Arrays.asList(roles));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<RoleDTO> getRolesSet() {
        return rolesSet;
    }

    public void setRolesSet(Set<RoleDTO> rolesSet) {
        this.rolesSet = rolesSet;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Byte getAge() {
        return age;
    }

    public void setAge(Byte age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Override
    public String toString() {
        return "{" +
                "\"id\":" + id +
                ",\"username\":\"" + username + '\"' +
                ",\"password\":\"" + password + '\"' +
                ",\"firstName\":\"" + firstName + '\"' +
                ",\"lastName\":\"" + lastName + '\"' +
                ",\"age\":" + age +
                ",\"email\":\"" + email + '\"' +
                ",\"roles\":\"" + rolesSet + '\"' +
                '}';
    }
}
