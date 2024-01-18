package com.a506.comeet.room.repository;

import com.a506.comeet.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {
    public Room findByTitle(String title);
    Optional<Room> findByIdAndIsDeletedFalse(Long id);
}
