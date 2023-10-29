package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.ThemeDao;
import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Theme;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ThemeService {
    private final ThemeDao themeDao;

    public List<Theme> findAll() {
        return themeDao.findAll();
    }

    public Theme findbyId(long id) {
        return themeDao.findById(id).orElseThrow(RuntimeException::new);
    }
}
