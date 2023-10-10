package com.takima.backskeleton.controllers;


import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.services.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequestMapping("cards")
@RestController
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;

    @GetMapping("")
    public List<Card> getAllCards() {
        return cardService.findAll();
    }
}
