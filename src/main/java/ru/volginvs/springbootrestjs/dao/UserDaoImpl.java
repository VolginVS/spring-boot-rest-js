package ru.volginvs.springbootrestjs.dao;

import org.springframework.stereotype.Repository;
import ru.volginvs.springbootrestjs.model.User;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(User user) {
        entityManager.persist(user);
    }

    @Override
    public User getById(Long id) {
        return entityManager.createQuery("from User where id = :id ", User.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    @Override
    public List<User> getAll() {
        return entityManager.createQuery("from User", User.class)
                .getResultList();
    }

    @Override
    public void update(User user) {
        entityManager.merge(user);
    }

    @Override
    public void removeById(Long id) {
        User user = getById(id);
        entityManager.remove(user);
    }

    @Override
    public User getByUsername(String username) {
        return entityManager.createQuery("from User where username = :username", User.class)
                .setParameter("username", username)
                .getSingleResult();
    }
}
