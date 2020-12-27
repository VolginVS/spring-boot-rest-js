package ru.volginvs.springbootrestjs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.volginvs.springbootrestjs.model.Role;
import ru.volginvs.springbootrestjs.model.User;
import ru.volginvs.springbootrestjs.service.RoleService;
import ru.volginvs.springbootrestjs.service.UserService;

import java.util.Set;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping(value = {"/", "/welcome"})
    public String welcome(Model model) {
        return "welcome";
    }

    @GetMapping(value = "/login")
    public String getLoginPage(Model model) {
        return "login";
    }

    @GetMapping(value = "/registration")
    public String getRegistrationPage(Model model) {
        Set<Role> roleSet = roleService.getAll();
        model.addAttribute("roleSet", roleSet);
        model.addAttribute("userForm", new User());
        return "registration";
    }

    @PostMapping(value = "/registration")
    public String registration(@ModelAttribute("userForm") User userForm) {
        roleService.addRoleToUserByRoleName(userForm,"ROLE_USER");
        userService.save(userForm);
        return "redirect:/login";
    }

    @GetMapping(value = "user")
    public String getUserInfo(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username= auth.getName();

        User user = userService.getByUsername(username);
        model.addAttribute("user", user);
        return "user-info";
    }

    @GetMapping(value = "admin")
    public String getAdminCrudTool(Model model, User user) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username= auth.getName();

        User activeUser = userService.getByUsername(username);
        model.addAttribute("activeUser", activeUser);
        return "users";
    }
}
