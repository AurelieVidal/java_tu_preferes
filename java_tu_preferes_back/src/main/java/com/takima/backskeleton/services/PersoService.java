package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.PersoDao;
import com.takima.backskeleton.models.Perso;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PersoService {
    private final PersoDao persoDao;

    public List<Perso> findAll() {
        return persoDao.findAll();
    }
}
