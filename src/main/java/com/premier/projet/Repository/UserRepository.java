package com.premier.projet.Repository;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.premier.projet.Model.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Long>{
	
	Optional<User> findByUsername(String username);

	List<User> findAllByEmail(String email);
	
	@Modifying
    @Transactional
    @Query("delete from User e where email = ?1")
    void deleteByEmail(String email);

	Optional<User> findByCode(int code);
	
}
	