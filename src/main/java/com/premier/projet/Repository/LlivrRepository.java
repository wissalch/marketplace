package com.premier.projet.Repository;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.premier.projet.Model.Llivr;
@Repository
public interface LlivrRepository extends JpaRepository<Llivr, Long>  {

	List<Llivr> findAllByNumero(int numero);

	List<Llivr> findAll(Sort ascending);

	List<Llivr> findByid(Long id);
	@Modifying
    @Transactional
    @Query("delete from Llivr e where numero = ?1")
    void deleteByNumero(int numero);
}
