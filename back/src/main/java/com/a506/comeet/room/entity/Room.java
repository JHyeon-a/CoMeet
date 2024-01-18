package com.a506.comeet.room.entity;

import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.member.entity.Member;
import com.a506.comeet.room.controller.RoomUpdateRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Room extends BaseEntityWithSoftDelete {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Member manager;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Lounge> lounges = new ArrayList<>();;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Channel> channels = new ArrayList<>();;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomMember> roomMembers = new ArrayList<>();

    private String title;
    private String description;
    private String link;
    @Column(name = "room_image")
    private String roomImage;
    private String notice;

    private String url;
    private int mcount;
    private int capacity;
    @Column(name = "is_locked")
    private Boolean isLocked;
    private String password;

    @Enumerated(EnumType.STRING)
    private RoomConstraints constraints;
    @Enumerated(EnumType.STRING)
    private RoomType type;

    protected Room(){
    }

    @Builder
    public Room(Member manager, String title, String description, int capacity, RoomConstraints constraints, RoomType type, String link) {
        this.manager = manager;
        this.title = title;
        this.description = description;
        this.capacity = capacity;
        this.constraints = constraints;
        this.type = type;
        this.link = link;
    }

    public void updateRoom(RoomUpdateRequestDto dto, Member newManager) {
        this.manager = newManager;
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.roomImage = dto.getRoomImage();
        this.notice = dto.getNotice();
        this.capacity = dto.getCapacity();
        this.isLocked = dto.getIsLocked();
        this.password = dto.getPassword();
        this.constraints = dto.getConstraints();
    }

    public void addRoomMember(RoomMember roomMember){
        roomMembers.add(roomMember);
        this.mcount = roomMembers.size();
    }

    public void removeRoomMember(RoomMember roomMember){
        roomMembers.removeIf(rm -> rm.getMember().getMemberId().equals(roomMember.getMember().getMemberId()) && rm.getRoom().getId().equals(roomMember.getRoom().getId()));
        this.mcount = roomMembers.size();
    }

    public void addChannel(Channel channel){
        this.channels.add(channel);
    }

    public void addLounge(Lounge lounge){
        this.lounges.add(lounge);
    }

    public void delete(){
        deleteSoftly();
        this.getLounges().forEach(Lounge::deleteSoftly);
        this.getChannels().forEach(Channel::deleteSoftly);
        this.lounges = new ArrayList<>();
        this.channels = new ArrayList<>();
    }

}
