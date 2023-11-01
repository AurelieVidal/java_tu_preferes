package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.LiaisonDao;
import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Liaison;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Component
@RequiredArgsConstructor
public class LiaisonService {
    private final LiaisonDao liaisonDao;

    public List<Liaison> findAll() {
        return liaisonDao.findAll();
    }

    public void createLiaison(Liaison liaison) {
        liaisonDao.save(liaison);
    }


    public void updateLiaison(Liaison liaison, Long id) {
        Liaison existingLiaison = liaisonDao.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Liaison doesn't exist"));

        // Mise à jour des champs de la liaison existante avec les données de la liaison reçue en paramètre
        existingLiaison.setId_1(liaison.getId_1());
        existingLiaison.setId_2(liaison.getId_2());
        // Ajoutez d'autres champs selon votre modèle Liaison

        // Enregistrez la liaison mise à jour dans la base de données
        liaisonDao.save(existingLiaison);
    }
}
