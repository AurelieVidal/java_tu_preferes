package com.takima.backskeleton.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "liaison")
@Getter
@NoArgsConstructor
public class Liaison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter
    @Setter
    private Long id_1;
    @Getter
    @Setter
    private Long id_2;
    @ManyToMany
    @JoinTable(
            name = "themes_liaisons",
            joinColumns = @JoinColumn(name = "liaison_id"),
            inverseJoinColumns = @JoinColumn(name = "theme_id"))
    @JsonIgnore
    private List<Theme> themes;




}

