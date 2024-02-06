package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.entity.Lounge;
import com.a506.comeet.app.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoungeRepository extends JpaRepository<Lounge, Long> {
    int countByRoom(Room room);
}
