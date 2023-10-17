package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.CardDao;
import com.takima.backskeleton.models.Card;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

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
}
