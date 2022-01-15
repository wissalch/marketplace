package com.premier.projet.Repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.premier.projet.Model.Lpanier;
import com.premier.projet.Dto.ListComm;

@Repository
public interface LpanierRepository extends JpaRepository<Lpanier, Long> {

	List<Lpanier> findAll(Sort ascending);
	
	List<Lpanier> findAllByNumero(int numero);

	Optional<Lpanier> findById(long id);

	@Modifying
    @Transactional
	  @Query("delete from Lpanier e where numero = ?1")
	    void deleteByNumero(int numero);



}
