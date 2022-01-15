package com.premier.projet.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.premier.projet.Repository.UserRepository;
import com.premier.projet.Model.Categorie;
import com.premier.projet.Model.Souscategorie;
import com.premier.projet.Model.User;
import javax.transaction.Transactional;
import org.springframework.data.domain.Sort;
@Service
@Transactional
public class UserService {
	@Autowired
	UserRepository repository;

	public List<User> getAll() {
		return repository.findAll(Sort.by("username").ascending());
		
	}
	
	public List<User> getAllByEmail(String email) {
		return repository.findAllByEmail(email);
		
	}
	
	
	
	public Optional<User> findById(long id) {
		return repository.findById(id);
	}
	public long save(User User) {
		System.out.println("Get all Users...");
	User user = new User()	;
	user.setUsername(User.getUsername());
	user.setLogin(User.getLogin());
	user.setEmail(User.getEmail());
	user.setPwd(User.getPwd());
	user.setRole(User.getRole());
	user.setActive(User.isActive());
	return repository.save(user).getId();
	}

	public void update(long id, User User) {
		Optional<User> userr = repository.findById(id);
		if (userr.isPresent()) {
			User user = userr.get();
			user.setUsername(User.getUsername());
			user.setLogin(User.getLogin());
			user.setEmail(User.getEmail());
			user.setPwd(User.getPwd());
			user.setRole(User.getRole());
			repository.save(user);
		}
		
		
		
		
		
	}


	public void delete(long id) {
		Optional<User> user = repository.findById(id);
		user.ifPresent(repository::delete);
	}
	

	public Optional<User> login(String username) {
		return repository.findByUsername(username);
	}

	public Optional<User> findByCode(int code) {
		return repository.findByCode(code);
	}
	
	}



