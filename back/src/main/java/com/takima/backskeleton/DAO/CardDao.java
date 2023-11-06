package com.takima.backskeleton.DAO;

import com.takima.backskeleton.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardDao extends JpaRepository<Card, Long> {
    List<Card> findByReponseLike(String keyword);
    boolean existsByReponse(String reponse);
}
