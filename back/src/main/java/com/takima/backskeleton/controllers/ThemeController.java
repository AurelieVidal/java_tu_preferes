package com.takima.backskeleton.controllers;

import com.takima.backskeleton.models.Theme;
import com.takima.backskeleton.services.ThemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequestMapping("themes")
@RestController
@RequiredArgsConstructor
public class ThemeController {
    private final ThemeService themeService;

    @GetMapping("")
    public List<Theme> getAllCourses() {
        return themeService.findAll();
    }
}
