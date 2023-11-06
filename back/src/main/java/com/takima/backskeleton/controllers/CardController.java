package com.takima.backskeleton.controllers;


import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Liaison;
import com.takima.backskeleton.services.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/search/{keyword}")
    public List<Card> searchCards(@PathVariable String keyword) {
        return cardService.findByReponse(keyword);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        cardService.deleteById(id);
    }

    @PostMapping("/{id}")
    public void update(@RequestBody Card card, @PathVariable Long id) {
        cardService.update(card, id);
    }

    @GetMapping("/exists/{reponse}")
    public ResponseEntity<Boolean> checkIfCardExists(@PathVariable String reponse) {
        boolean exists = cardService.existsCardWithReponse(reponse);
        return ResponseEntity.ok(exists);
    }

}
