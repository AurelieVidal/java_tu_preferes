package com.takima.backskeleton.controllers;


import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Liaison;
import com.takima.backskeleton.services.LiaisonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequestMapping("liaisons")
@RestController
@RequiredArgsConstructor
public class LiaisonController {
    private final LiaisonService liaisonService;

    @GetMapping("")
    public List<Liaison> getAllCards() {
        return liaisonService.findAll();
    }
}
