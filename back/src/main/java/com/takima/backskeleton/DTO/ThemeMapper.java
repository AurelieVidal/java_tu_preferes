package com.takima.backskeleton.DTO;

import com.takima.backskeleton.models.Theme;

import java.io.IOException;

public class ThemeMapper {
    public static Theme fromDto(ThemeDto dto, Long id) throws IOException {
        return new Theme.Builder()
                .id(id)
                .name(dto.getName())
                .paires(dto.getPaires())
                .build();
    }

    public static ThemeDto toDto (Theme theme){
        return ThemeDto.builder()
                .name(theme.getName())
                .paires(theme.getPaires())
                .build();
    }
}
