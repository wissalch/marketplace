package com.premier.projet.Controller;
import java.util.Optional;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.premier.projet.Model.Article;
import com.premier.projet.Model.User;
import com.premier.projet.Service.UserService;
import com.premier.projet.Repository.UserRepository;
import com.premier.projet.Model.UserExcel;
//import com.premier.projet.domaine.Message;
//import com.premier.projet.request.RegisterRequest;
@CrossOrigin (origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class UserController {
@Autowired private 	UserService userService;
@Autowired ServletContext context;  
	@GetMapping("/users")
	public List<User> list() {
		return userService.getAll();
			
	}
	
	
	@GetMapping("/users/verif/{email}")
	public List<User> listuserbyemail(@PathVariable String email) {
		return userService.getAllByEmail(email);
			
	}
	
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getuserById(@PathVariable long id)
	         {
		Optional<User> us = userService.findById(id);
	      return us.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				
		
	}
	
	@GetMapping("/user/{code}")
	public ResponseEntity<User> getuserByCode(@PathVariable int code)
	         {
		Optional<User> us = userService.findByCode(code);
	      return us.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				
		
	}
	
	@GetMapping("/users/5/{username}")
	public ResponseEntity<User>getuserByname(@PathVariable String username)
	         {
		Optional<User> us = userService.login(username);
	      return us.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
				
		
	}
	
	@PostMapping("/users")
	public long save(@RequestBody User user){
		return userService.save(user);
	}
	
	
	
	@DeleteMapping("/users/{id}")
	public void delete(@PathVariable long id){
		userService.delete(id);
		
	}
	
	
	
	
	
	@PutMapping("/users/{id}")
	public void update(@PathVariable long id, @RequestBody User User){
		System.out.println("update User with ID = " + id + "...");
		Optional<User> user = userService.findById(id);
		if(user.isPresent()) {
			
			
          userService.update(id, User);
           }
		else {
			userService.save(User);
		}

}
	

    @GetMapping("/user/export/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=categories_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);
        List<User> listUsers = userService.getAll();
        UserExcel excel = new UserExcel(listUsers);
        excel.export(response);    
    }  

}