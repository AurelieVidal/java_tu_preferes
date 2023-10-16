package com.takima.backskeleton.controllers;


import com.takima.backskeleton.models.Perso;
import com.takima.backskeleton.services.PersoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequestMapping("persos")
@RestController
@RequiredArgsConstructor
public class PersoController {
    private final PersoService persoService ;

    @GetMapping("")
    public List<Perso> getAllPersos() {
        return persoService.findAll();
    }
}
