package ru.volginvs.springbootrestjs.dao;

import org.springframework.stereotype.Repository;
import ru.volginvs.springbootrestjs.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashSet;
import java.util.Set;

@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Role getByName(String name) {
        return entityManager.createQuery("from Role where name = :name", Role.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public Set<Role> getAll() {
        return new HashSet<Role>(entityManager.createQuery("from Role", Role.class)
                .getResultList());
    }
}
