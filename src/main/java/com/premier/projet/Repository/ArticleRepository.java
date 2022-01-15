package com.premier.projet.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Dto.ListCategorie;
import com.premier.projet.Model.Article;
import com.premier.projet.Model.Souscategorie;
@Repository

public interface ArticleRepository extends JpaRepository<Article, Long>{
	Optional<Article> findByCode(String code);
	List<Article> findAllByLibelle(String libelle);
    List<Article> findAllByCcateg(String code);
	List<Article> findAllByCodesous(String codesous);
	
	Optional<Article> findAllById(long id);
	
	@Query(value = "SELECT new com.premier.projet.Dto.ListArticle (a.id,a.code,a.libelle,a.pa,a.pv,a.tva,a.stk_init,b.libelle,c.libelle,d.libelle,d.code) "
			+ " from Article a, Souscategorie b, Categorie c, Fournisseur d where a.codesous = b.code and b.ccateg = c.code and a.codef = d.code")
	List<ListArticle> listArticle();
	
@Query(value = "SELECT new com.premier.projet.Dto.ListArticle (a.id,a.code,a.libelle,a.pa,a.pv,a.tva,a.stk_init,b.libelle,c.libelle,d.libelle,d.code)"
		+ " from Article a, Souscategorie b, Categorie c, Fournisseur d where a.codesous = b.code and b.ccateg = c.code and a.codef = d.code"
			+ " and d.code = :code")
	List<ListArticle> listArticleFour(@Param("code") int code);


	@Query(value = "SELECT count (*) fROM Article WHERE ccateg = :code")
	public int nbre (@Param("code") String code);
	
	@Query(value = "SELECT max(code) fROM Article WHERE ccateg = :code")
	public int max (@Param("code") String code);
	
	List<Article> findByCodesous(String code);
	
	
	
	
}
			
			
			
			
			
			
			
