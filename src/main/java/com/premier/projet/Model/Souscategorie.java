package com.premier.projet.Model;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
@Entity
@Table(name = "souscategorie")


public class Souscategorie {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String code;
	private String ccateg;
	private String libelle;
	  private int rang;
	 
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCcateg() {
		return ccateg;
	}
	public void setCcateg(String ccateg) {
		this.ccateg =ccateg;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public int getRang() {
		return rang;
	}
	public void setRang(int rang) {
		this.rang = rang;
	}
	public Souscategorie(long id, String code, String ccateg, String libelle, int rang) {
		super();
		this.id = id;
		this.code = code;
		this.ccateg = ccateg;
		this.libelle = libelle;
		this.rang = rang;
	}
	public Souscategorie() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Souscategorie [id=" + id + ", code=" + code + ", ccateg=" + ccateg + ", libelle=" + libelle + ", rang="
				+ rang + "]";
	}
	


}