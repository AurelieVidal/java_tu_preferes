package com.takima.backskeleton.DAO;

import com.takima.backskeleton.models.Perso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersoDao extends JpaRepository<Perso, Long> {
}
