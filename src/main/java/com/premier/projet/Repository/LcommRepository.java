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

import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Dto.ListComm;
import com.premier.projet.Dto.ListCommFour;
import com.premier.projet.Model.Lcomm;
@Repository
public interface LcommRepository extends JpaRepository<Lcomm, Long>{

	List<Lcomm> findAll(Sort ascending);
	Optional<Lcomm> findById(long id);
	List<Lcomm> findAllByNumero(int numero);
	//Iterable<Lcomm> findAllByNumero(int numero);
	@Modifying
    @Transactional
    @Query("delete from Lcomm e where numero = ?1")
    void deleteByNumero(int numero);
	

	
	
	
@Query(value = "SELECT new com.premier.projet.Dto.ListArticle (a.id,a.code,a.libelle,a.pa,a.pv,a.tva,a.stk_init,b.libelle,c.libelle,d.libelle,d.code)"
		+ " from Article a, Souscategorie b, Categorie c, Fournisseur d where a.codesous = b.code and b.ccateg = c.code and a.codef = d.code"
			+ " and d.code = :code")
	List<ListArticle> listArticleFour(@Param("code") int code);



@Query(value = "SELECT new com.premier.projet.Dto.ListCommFour (a.id,a.numero,a.code,a.Libart,a.pu,a.qte,a.tva,a.totht,a.tottva,a.totttc,"
		+ " b.code,b.nom)"
		+ " from Lcomm a ,Comm b, Article c, Fournisseur f where a.numero = b.numero and c.codef = f.code and a.code = c.code"
		+ " and f.code = :code")  

List<ListCommFour> listCommFourr(int code);

}
