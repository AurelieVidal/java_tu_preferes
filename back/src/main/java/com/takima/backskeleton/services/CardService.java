package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.CardDao;
import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Liaison;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class CardService {
    private final CardDao cardDao;

    public List<Card> findAll() {
        return cardDao.findAll();
    }

    public Card findbyId(long id) {
        return cardDao.findById(id).orElseThrow(RuntimeException::new);
    }

    public Card createCard(Card card) {
        return cardDao.save(card);

    }

    public List<Card> findByReponse(String keyword) {
        return cardDao.findByReponseLike("%" + keyword + "%");
    }

    public void deleteById(Long id) {
        cardDao.deleteById(id);
    }

    public void update(Card card, Long id) {
        Card existingCard = cardDao.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Liaison doesn't exist"));

        // Mise à jour des champs de la liaison existante avec les données de la liaison reçue en paramètre
        existingCard.setReponse(card.getReponse());
        // Ajoutez d'autres champs selon votre modèle Liaison

        // Enregistrez la liaison mise à jour dans la base de données
        cardDao.save(existingCard);
    }

    public boolean existsCardWithReponse(String reponse) {
        return cardDao.existsByReponse(reponse);
    }
}
