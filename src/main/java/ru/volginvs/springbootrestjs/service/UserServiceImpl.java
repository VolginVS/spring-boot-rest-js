package ru.volginvs.springbootrestjs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.volginvs.springbootrestjs.dao.RoleDao;
import ru.volginvs.springbootrestjs.dao.UserDao;
import ru.volginvs.springbootrestjs.model.User;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Override
    @Transactional
    public void save(User user) {
        userDao.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getById(Long id) {
        return userDao.getById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAll() {
        return userDao.getAll();
    }

    @Override
    @Transactional
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    @Transactional
    public void removeById(Long id) {
        userDao.removeById(id);
    }

    @Transactional
    @Override
    public User getByUsername(String username) {
        return userDao.getByUsername(username);
    }

    // ??? ты присераешь role к POJO объекту, но при этом не записываешь ее в базу данных

    
}
