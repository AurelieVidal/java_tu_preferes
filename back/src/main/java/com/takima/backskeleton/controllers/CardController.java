package com.takima.backskeleton.controllers;


import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.services.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public Card getCardbyId(@PathVariable long id) {
        return cardService.findbyId(id);
    }

    @PostMapping("")
    public Card createCard(@RequestBody Card card) {
        return cardService.createCard(card);
    }

}
