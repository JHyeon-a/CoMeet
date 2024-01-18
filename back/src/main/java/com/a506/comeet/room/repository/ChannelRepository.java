package com.a506.comeet.room.repository;

import com.a506.comeet.room.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findByIdAndIsDeletedFalse(Long id);
}
