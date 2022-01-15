package com.premier.projet.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.premier.projet.Model.Fournisseur;
@Repository

public interface FournisseurRepository extends JpaRepository<Fournisseur, Long>{
	List<Fournisseur> findAllByLibelle(String libelle);
	Optional<Fournisseur> findByCode(String code);
	
}