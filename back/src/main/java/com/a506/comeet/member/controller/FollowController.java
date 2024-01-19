package com.a506.comeet.member.controller;

import com.a506.comeet.member.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/follow")
    public ResponseEntity<?> follow(@RequestBody FollowRequestDto req){
        String reqMemberId = "요청자";
        String res = followService.follow(req, reqMemberId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping("/unfollow")
    public ResponseEntity<?> unfollow(@RequestBody UnfollowRequestDto req){
        String reqMemberId = "요청자";
        if(!followService.unfollow(req, reqMemberId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/follower/{memberId}")
    public ResponseEntity<?> getFollowers(@RequestBody FollowerRequestDto req, @PathVariable String memberId){
        return new ResponseEntity<Slice>(followService.getFollower(req, memberId), HttpStatus.OK);

    }

    @GetMapping("/following/{memberId}")
    public ResponseEntity<?> getFollowings(@RequestBody FollowingReqeustDto req, @PathVariable String memberId){
        return new ResponseEntity<Slice>(followService.getFollowing(req, memberId), HttpStatus.OK);
    }

}
