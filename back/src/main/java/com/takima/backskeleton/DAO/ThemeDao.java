package com.takima.backskeleton.DAO;

import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeDao extends JpaRepository<Theme, Long> {
    List<Theme> findByNameLike(String keyword);
}
