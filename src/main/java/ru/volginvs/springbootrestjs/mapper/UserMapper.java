package ru.volginvs.springbootrestjs.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.volginvs.springbootrestjs.dto.UserDTO;
import ru.volginvs.springbootrestjs.model.User;

@Mapper
public interface UserMapper {

    UserMapper USER_MAPPER_INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "roles", target = "rolesSet")
    UserDTO toDTO(User user);

    @InheritInverseConfiguration
    User toUser(UserDTO userDTO);
}
