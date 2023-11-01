package com.takima.backskeleton.services;

import com.takima.backskeleton.DAO.ThemeDao;
import com.takima.backskeleton.DTO.ThemeDto;
import com.takima.backskeleton.DTO.ThemeMapper;
import com.takima.backskeleton.models.Card;
import com.takima.backskeleton.models.Theme;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

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


    @Transactional
    public void update(ThemeDto themeDto, Long id) {
        themeDao.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Theme doesn't exist"));
        Theme theme;
        try {
            theme = ThemeMapper.fromDto(themeDto, id);
        } catch (IOException e) {
            throw new RuntimeException("Error with Theme image", e);
        }
        themeDao.save(theme);
    }



}
