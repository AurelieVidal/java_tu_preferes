package com.takima.backskeleton.DTO;


import com.takima.backskeleton.models.Liaison;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Builder
@Getter
public class ThemeDto {
    private String name;
    private List<Liaison> paires;
}
