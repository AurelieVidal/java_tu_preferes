package com.takima.backskeleton.controllers;

import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Theme;
import com.takima.backskeleton.services.ThemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public Theme getThemebyId(@PathVariable long id) {
        return themeService.findbyId(id);
    }

}
