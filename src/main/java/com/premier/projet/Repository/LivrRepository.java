package com.premier.projet.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.premier.projet.Dto.ListLivrFour;
import com.premier.projet.Model.Livr;
@Repository
public interface LivrRepository extends JpaRepository<Livr, Long> {

	List<Livr> findAll(Sort ascending);

	Optional<Livr> findById(Long id);

	Optional<Livr> findByCode(String code);

	Livr findByid(Long id);
	
	@Query(value = "SELECT new com.premier.projet.Dto.ListLivrFour (a.id,a.annee,a.numero,a.code,a.libelle,a.date_mvt,a.smtva,"
			+ "a.chauffeur,a.camion,a.totht,a.totrem,a.totfodec,a.tottva,a.totttc,a.numfac)"
			+ " from Livr a , Article c, Fournisseur f ,Llivr b where c.codef = f.code and b.code = c.code and b.numero=a.numero"
			+ " and f.code = :code")
List<ListLivrFour> listLivrFour(@Param("code") int code);

}



