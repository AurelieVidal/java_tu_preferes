package com.takima.backskeleton.DAO;

import com.takima.backskeleton.models.Liaison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LiaisonDao extends JpaRepository<Liaison, Long> {
}
