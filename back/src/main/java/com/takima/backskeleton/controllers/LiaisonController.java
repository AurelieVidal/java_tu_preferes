package com.takima.backskeleton.controllers;


import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Liaison;
import com.takima.backskeleton.services.LiaisonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public void createLiaison(@RequestBody Liaison liaison) {
        liaisonService.createLiaison(liaison);

    }

    @PostMapping("/{id}")
    public void updateStudent(@RequestBody Liaison liaison, @PathVariable Long id) {
        liaisonService.updateLiaison(liaison, id);
    }


}
