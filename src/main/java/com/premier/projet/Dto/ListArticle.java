package com.premier.projet.Dto;


public class ListArticle {
	private long id;
	private String code;
	private String libelle;
	private float pv;
	private float pa;
	private int tva;
	private float stk_init;
	private String categ;
	private String scateg;
	private String four;
	private int codef;
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
	public float getStk_init() {
		return stk_init;
	}
	public void setStk_init(float stk_init) {
		this.stk_init = stk_init;
	}
	public String getCateg() {
		return categ;
	}
	public void setCateg(String categ) {
		this.categ = categ;
	}
	public String getScateg() {
		return scateg;
	}
	public void setScateg(String scateg) {
		this.scateg = scateg;
	}
	public String getFour() {
		return four;
	}
	public void setFour(String four) {
		this.four = four;
	}
	public int getCodef() {
		return codef;
	}
	public void setCodef(int codef) {
		this.codef = codef;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "ListArticle [id=" + id + ", code=" + code + ", libelle=" + libelle + ", pv=" + pv + ", pa=" + pa
				+ ", tva=" + tva + ", stk_init=" + stk_init + ", categ=" + categ + ", scateg=" + scateg + ", four="
				+ four + ", codef=" + codef + "]";
	}
	public ListArticle(long id, String code, String libelle, float pv, float pa, int tva, float stk_init, String categ,
			String scateg, String four, int codef) {
		super();
		this.id = id;
		this.code = code;
		this.libelle = libelle;
		this.pv = pv;
		this.pa = pa;
		this.tva = tva;
		this.stk_init = stk_init;
		this.categ = categ;
		this.scateg = scateg;
		this.four = four;
		this.codef = codef;
	}
	public ListArticle() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}