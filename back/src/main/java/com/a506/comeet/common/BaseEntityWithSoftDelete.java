package com.a506.comeet.common;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Getter
@MappedSuperclass
public class BaseEntityWithSoftDelete {

    @CreatedDate
    @Column(updatable = false, name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_deleted")
    private boolean isDeleted = Boolean.FALSE;

    // soft delete는 BaseEntity 내에 직접 구현
    public void deleteSoftly() {
        this.isDeleted = Boolean.TRUE;
    }

    public boolean isSoftDeleted() {
        return this.isDeleted = Boolean.TRUE;
    }

    public void undoDeletion() {
        this.isDeleted = Boolean.FALSE;
    }
}
