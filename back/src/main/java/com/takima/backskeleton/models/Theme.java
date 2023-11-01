package com.takima.backskeleton.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "themes")
@Getter
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @ManyToMany
    @JoinTable(
            name = "themes_liaisons",
            joinColumns = @JoinColumn(name = "theme_id"),
            inverseJoinColumns = @JoinColumn(name = "liaison_id"))
    List<Liaison> paires;


    //@JsonManagedReference

    private Theme(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.paires = builder.paires;
    }
    public Theme() {
    }

    public static class Builder {
        private Long id;
        private String name;
        private List<Liaison> paires;

        public Builder id (Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder paires(List<Liaison> paires) {
            this.paires = paires;
            return this;
        }



        public Theme build() {
            return new Theme(this);
        }
    }
}



