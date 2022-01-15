package com.premier.projet.Controller;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.premier.projet.Dto.ListArticle;
import com.premier.projet.Model.Article;
import com.premier.projet.Model.ArticleExcel;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.CategorieExcel;
import com.premier.projet.Service.ArticleService;
import com.premier.projet.Repository.ArticleRepository;
import com.premier.projet.Repository.SouscategorieRepository;
 
 @CrossOrigin(origins = "http://localhost:8100")
 @RestController
 @RequestMapping("/api")
 public class ArticleController {
	 @Autowired
	 private ArticleService artService;
		
	 @Autowired ServletContext context;  
	
	 @GetMapping("/articles/7/{code}")
	 public int getCode(@PathVariable String code) {
	System.out.println("Get Numbers");	
	int x = artService.nbre(code);
	System.out.println(x);
	if (x ==0)
	{
	return 0;
	 }
	else
	{return artService.max(code);
	}
	}
	 
	
	 @PostMapping("/articles")
	 public long createArticle (@RequestParam("file") MultipartFile file ,
	 @RequestParam("article") String article) throws JsonParseException , JsonMappingException , Exception
	 {
		 System.out.println("Ok .............");
        Article arti = new ObjectMapper().readValue(article, Article.class);
        boolean isExit = new File(context.getRealPath("/Images/")).exists();
        if (!isExit)
        {
        	new File (context.getRealPath("/Images/")).mkdir();
        	System.out.println("mk dir.............");
        }
        String filename = file.getOriginalFilename();
        String newFileName = FilenameUtils.getBaseName(filename)+"."+FilenameUtils.getExtension(filename);
        File serverFile = new File (context.getRealPath("/Images/"+File.separator+newFileName));
        try
        {
        	System.out.println("Image");
        	 FileUtils.writeByteArrayToFile(serverFile,file.getBytes());
        	 
        }catch(Exception e) {
        	e.printStackTrace();
        }
   arti.setFileName(newFileName);
   return artService.save(arti);
	 }     
	 
	 
	// @GetMapping("/articles")
	// public List<Article> list() {
	//	 return artService.getAll();
	// }
	 
	 @GetMapping("/articles")
	 public List<Article> list() {
		 System.out.println("Get all articles...");
	             return artService.getAll();
	   }
	 
	 @GetMapping("/articles/{id}")
	 public ResponseEntity<Article> post(@PathVariable long id){
		 Optional<Article> art = artService.findById(id);
		 return art.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	 }
	 
	 @GetMapping(path="/Imgarticles/{code}")
	 public byte[] getPhoto(@PathVariable("code") String code) throws Exception {
		 Article article = artService.findByCode(code).get();
		 return Files.readAllBytes(Paths.get(context.getRealPath("/Images/")+article.getFileName()));
 }
	
	 
	 @PutMapping("/articles/{code}")
	 public void update(@PathVariable String code,@RequestBody Article article) {
	 Optional<Article> art = artService.findByCode(code);
	 if (art.isPresent()) {
	 artService.update(code, article);
	 } else {
		artService.save(article);
		 }
		 }
	 @DeleteMapping("/articles/{code}")
	 public void delete(@PathVariable String code) {
	 artService.delete(code);
	 }
	
	 
	 @GetMapping("/articles/f/{code}")
	 public List<ListArticle> listArtf(@PathVariable int code) {
		 System.out.println("Get all liste articles...");
	             return artService.listArtf(code);
	   }
	 
	 @GetMapping("/articles/export/excel")
	    public void exportToExcel(HttpServletResponse response) throws IOException {
	        response.setContentType("application/octet-stream");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=articles_" + currentDateTime + ".xlsx";
	        response.setHeader(headerKey, headerValue);
	        List<Article> listArticles = artService.getAll();
	        ArticleExcel excel = new ArticleExcel(listArticles);
	        excel.export(response);    
	    } 
	 
	 
	 
	 
 }
	 
	 
	 
	