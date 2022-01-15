package com.premier.projet.Model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "fournisseur",

uniqueConstraints = { 
		@UniqueConstraint(columnNames = "code"
				+ ""),
		@UniqueConstraint(columnNames = "email") 
	})

public class Fournisseur {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private int code;
	@NotBlank
	@Size(max = 60)
	private String libelle;
	private String adresse;
	private String responsable;
	private String fax;
	private String ville;
	private String tel;
	@NotBlank
	@Size(max = 60)
	@Email
	private String email;
	private String pwd;
	private String matfisc;
	private double soldef;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getResponsable() {
		return responsable;
	}
	public void setResponsable(String responsable) {
		this.responsable = responsable;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getVille() {
		return ville;
	}
	public void setVille(String ville) {
		this.ville = ville;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getMatfisc() {
		return matfisc;
	}
	public void setMatfisc(String matfisc) {
		this.matfisc = matfisc;
	}
	public double getSoldef() {
		return soldef;
	}
	public void setSoldef(double soldef) {
		this.soldef = soldef;
	}
	@Override
	public String toString() {
		return "Fournisseur [id=" + id + ", code=" + code + ", libelle=" + libelle + ", adresse=" + adresse
				+ ", responsable=" + responsable + ", fax=" + fax + ", ville=" + ville + ", tel=" + tel + ", email="
				+ email + ", pwd=" + pwd + ", matfisc=" + matfisc + ", soldef=" + soldef + "]";
	}
	public Fournisseur(long id, int code, @NotBlank @Size(max = 60) String libelle, String adresse, String responsable,
			String fax, String ville, String tel, @NotBlank @Size(max = 60) @Email String email, String pwd,
			String matfisc, double soldef) {
		super();
		this.id = id;
		this.code = code;
		this.libelle = libelle;
		this.adresse = adresse;
		this.responsable = responsable;
		this.fax = fax;
		this.ville = ville;
		this.tel = tel;
		this.email = email;
		this.pwd = pwd;
		this.matfisc = matfisc;
		this.soldef = soldef;
	}
	public Fournisseur() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}