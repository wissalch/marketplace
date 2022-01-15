package com.premier.projet.Model;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;



@Entity
@Table(name = "Utilisateur",
uniqueConstraints = { 
		@UniqueConstraint(columnNames = "username"
				+ ""),
		@UniqueConstraint(columnNames = "email") 
	})
public class User {
	
	@Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private long id;
	@NotBlank
	@Size(max = 40)
	  private String username;
	@NotBlank
	@Size(max = 60)
	@Email
	  private String email;
	private String login;
	 private String pwd;
	  private String role;
	  public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(long id, @NotBlank @Size(max = 40) String username, @NotBlank @Size(max = 60) @Email String email,
			String login, String pwd,String pwdd, String role, boolean isActive, String nom, int code, String fileName) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.login = login;
		this.pwd = pwd;
		this.pwdd = pwdd;
		this.role = role;
		this.isActive = isActive;
		this.nom = nom;
		this.code = code;
		this.fileName = fileName;
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", login=" + login + ", pwd=" + pwd
				+ ", role=" + role + ", isActive=" + isActive + ", nom=" + nom + ", code=" + code + ", fileName="
				+ fileName + ", pwdd=" + pwdd + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getPwdd() {
		return pwdd;
	}
	public void setPwdd(String pwdd) {
		this.pwdd = pwdd;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	private boolean isActive;
	  private String nom;
	  private int code;
	  private String fileName;
	  private String pwdd;

	
}