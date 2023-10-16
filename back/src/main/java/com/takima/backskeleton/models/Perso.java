package com.takima.backskeleton.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "perso")
@Getter
@NoArgsConstructor
public class Perso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String prenom;


}

