package com.clickyman.controller;

import java.util.Random;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.clickyman.dto.RandomNumber;

@RestController
public class FooController {
	@PreAuthorize("#oauth2.hasScope('read')")
    @RequestMapping(method = RequestMethod.GET, value = "/foos")
    @ResponseBody
    public RandomNumber findById() {
        return new RandomNumber(new Random().nextInt());
    }
}
