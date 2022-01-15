package com.premier.projet.Model;
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
@Table(name = "client",

uniqueConstraints = { 
		@UniqueConstraint(columnNames = "code"
				+ ""),
		@UniqueConstraint(columnNames = "email") 
	})

public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String adresse;
	private String code;
	@NotBlank
	@Size(max = 60)
	private String libelle;
	private String contact;
	@NotBlank
	@Size(max = 60)
	@Email
	private String email;

	private String login;
	private String matfisc;
	private String pwd;
	private float  solde;
	private float  solde_init;
	private String tel;
	private String  timbre;
	public Client() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Client(long id, String adresse, String code, String contact, String email, String libelle, String login,
			String matfisc, String pwd, float solde, float solde_init, String tel, String timbre) {
		super();
		this.id = id;
		this.adresse = adresse;
		this.code = code;
		this.contact = contact;
		this.email = email;
		this.libelle = libelle;
		this.login = login;
		this.matfisc = matfisc;
		this.pwd = pwd;
		this.solde = solde;
		this.solde_init = solde_init;
		this.tel = tel;
		this.timbre = timbre;
	}
	@Override
	public String toString() {
		return "Client [id=" + id + ", adresse=" + adresse + ", code=" + code + ", contact=" + contact + ", email="
				+ email + ", libelle=" + libelle + ", login=" + login + ", matfisc=" + matfisc + ", pwd=" + pwd
				+ ", solde=" + solde + ", solde_init=" + solde_init + ", tel=" + tel + ", timbre=" + timbre + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getMatfisc() {
		return matfisc;
	}
	public void setMatfisc(String matfisc) {
		this.matfisc = matfisc;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public float getSolde() {
		return solde;
	}
	public void setSolde(float solde) {
		this.solde = solde;
	}
	public float getSolde_init() {
		return solde_init;
	}
	public void setSolde_init(float solde_init) {
		this.solde_init = solde_init;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getTimbre() {
		return timbre;
	}
	public void setTimbre(String timbre) {
		this.timbre = timbre;
	}
	
}
