package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.premier.projet.Repository.SouscategorieRepository;
import com.premier.projet.Repository.ArticleRepository;
import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Model.Article;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Souscategorie;
import com.premier.projet.Model.Societe;

import javax.transaction.Transactional;
import org.springframework.data.domain.Sort;
@Service
@Transactional

public class ArticleService {
@Autowired
ArticleRepository repository;
@Autowired
SouscategorieRepository scatRepository;
//public List<Article> getAll() {
//	System.out.println("Get all Articles");
//	return repository.listArticle();
//}
public List<Article> getAll() {
	System.out.println("Get all Articles 11111...");
	return repository.findAll(Sort.by("libelle").ascending());	    	
}


	


public Optional<Article> findByCode(String code) {
	
	return repository.findByCode(code);
}
public long save(Article article) {
	System.out.println("Save Article");
	
Article art = new Article()	;                                      
art.setCode(article.getCode());
art.setLibelle(article.getLibelle());
art.setPv(article.getPv());
art.setPa(article.getPa());
art.setTva(article.getTva());
art.setFodec(article.getFodec());

art.setStk_init(article.getStk_init());
art.setCcateg(article.getCcateg());
art.setCodesous(article.getCodesous());
art.setCode_b(article.getCode_b());
art.setCodef(article.getCodef());
art.setFileName(article.getFileName());


Optional<Souscategorie> SouscatInfo = scatRepository.findByCode(article.getCodesous());
if(SouscatInfo.isPresent())
{ Souscategorie scat = SouscatInfo.get();

scat.setRang(scat.getRang()+1);
scat = scatRepository.save(scat);
}
return repository.save(art).getId();
}

public void update(String code, Article article) {
	
	Optional<Article> arti = repository.findByCode(code);
	
	if (arti.isPresent()) {
		Article art = arti.get();
		
		art.setLibelle(article.getLibelle());
		art.setCode(article.getCode());
		
		art.setPa(article.getPa());
		art.setPv(article.getPv());
		art.setTva(article.getTva());
		art.setFodec(article.getFodec());
		
		art.setStk_init(article.getStk_init());
		art.setCcateg(article.getCcateg());
		art.setCodesous(article.getCodesous());
		art.setCode_b(article.getCode_b());
		
		
		repository.save(art);
	}
}
public List<Article>findByLibelle(String libelle) {
	return repository.findAllByLibelle(libelle);
	
}

public List<Article>findByCcateg(String code) {
	return repository.findAllByCcateg(code);
	
}
public void delete(String code) {
	Optional<Article> art = repository.findByCode(code);
	art.ifPresent(repository::delete);
}
public List<Article> findByCodesous(String code) {
	return repository.findByCodesous(code);
}

public int nbre(String code) {
	return repository.nbre(code);
}
public int max(String code) {
return repository.max(code);
}
public Optional<Article> findById(long id) {
	return repository.findById(id);
}





public List<ListArticle> listArtf(int code) {
	return repository.listArticleFour(code);
}














}	
	
	
	
	

