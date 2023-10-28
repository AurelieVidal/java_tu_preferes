package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.LiaisonDao;
import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Liaison;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LiaisonService {
    private final LiaisonDao liaisonDao;

    public List<Liaison> findAll() {
        return liaisonDao.findAll();
    }

    public void createLiaison(Liaison liaison) {liaisonDao.save(liaison);}
}
