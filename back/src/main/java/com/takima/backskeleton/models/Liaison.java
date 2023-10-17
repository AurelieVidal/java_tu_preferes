package com.takima.backskeleton.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "liaison")
@Getter
@NoArgsConstructor
public class Liaison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_1;
    private Long id_2;


}

