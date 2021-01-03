package ru.volginvs.springbootrestjs.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.volginvs.springbootrestjs.dto.RoleDTO;
import ru.volginvs.springbootrestjs.model.Role;

@Mapper
public interface RoleMapper {
    RoleMapper ROLE_MAPPER_INSTANCE = Mappers.getMapper(RoleMapper.class);

    RoleDTO toDTO(Role role);

    @InheritInverseConfiguration
    Role toRole(RoleDTO roleDTO);
}
