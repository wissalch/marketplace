package com.premier.projet.Model;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
@Table(name = "article")


public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String code;
	private String libelle;
	
	private float pv;
	private float pa;
	private int tva;
	private int fodec;
	
	private float stk_init;
	private String ccateg;
	private String codesous;
	private String code_b;
	 private String fileName;
	 private int codef;
	 @JsonManagedReference
	 @JsonIgnore
	  @OneToMany(mappedBy = "article", fetch=FetchType.EAGER)
    
    
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
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public float getPv() {
		return pv;
	}
	public void setPv(float pv) {
		this.pv = pv;
	}
	public float getPa() {
		return pa;
	}
	public void setPa(float pa) {
		this.pa = pa;
	}
	public int getTva() {
		return tva;
	}
	public void setTva(int tva) {
		this.tva = tva;
	}
	public int getFodec() {
		return fodec;
	}
	public void setFodec(int fodec) {
		this.fodec = fodec;
	}
	public float getStk_init() {
		return stk_init;
	}
	public void setStk_init(float stk_init) {
		this.stk_init = stk_init;
	}
	public String getCcateg() {
		return ccateg;
	}
	public void setCcateg(String ccateg) {
		this.ccateg = ccateg;
	}
	public String getCodesous() {
		return codesous;
	}
	public void setCodesous(String codesous) {
		this.codesous = codesous;
	}
	public String getCode_b() {
		return code_b;
	}
	public void setCode_b(String code_b) {
		this.code_b = code_b;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getCodef() {
		return codef;
	}
	public void setCodef(int codef) {
		this.codef = codef;
	}
	@Override
	public String toString() {
		return "Article [id=" + id + ", code=" + code + ", libelle=" + libelle + ", pv=" + pv + ", pa=" + pa + ", tva="
				+ tva + ", fodec=" + fodec + ", stk_init=" + stk_init + ", ccateg=" + ccateg + ", codesous=" + codesous
				+ ", code_b=" + code_b + ", fileName=" + fileName + ", codef=" + codef + "]";
	}
	public Article(long id, String code, String libelle, float pv, float pa, int tva, int fodec, float stk_init,
			String ccateg, String codesous, String code_b, String fileName, int codef) {
		super();
		this.id = id;
		this.code = code;
		this.libelle = libelle;
		this.pv = pv;
		this.pa = pa;
		this.tva = tva;
		this.fodec = fodec;
		this.stk_init = stk_init;
		this.ccateg = ccateg;
		this.codesous = codesous;
		this.code_b = code_b;
		this.fileName = fileName;
		this.codef = codef;
	}
	public Article() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}