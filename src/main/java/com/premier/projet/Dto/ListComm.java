package com.premier.projet.Dto;

public class ListComm {
	
	private long id;
	//lpanier
	private String codeart;
	private String libelle;
	private int pv;
	private double qte;
	private int tva;
	//panier
	private double tottht;
	private double tottva;
	private double totttc;
	//client
	private String nom;
	private String code;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCodeart() {
		return codeart;
	}
	public void setCodeart(String codeart) {
		this.codeart = codeart;
	}
	public String getLibelle() {
		return libelle;
	}
	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	public int getPv() {
		return pv;
	}
	public void setPv(int pv) {
		this.pv = pv;
	}
	public double getQte() {
		return qte;
	}
	public void setQte(double qte) {
		this.qte = qte;
	}
	public int getTva() {
		return tva;
	}
	public void setTva(int tva) {
		this.tva = tva;
	}
	public double getTottht() {
		return tottht;
	}
	public void setTottht(double tottht) {
		this.tottht = tottht;
	}
	public double getTottva() {
		return tottva;
	}
	public void setTottva(double tottva) {
		this.tottva = tottva;
	}
	public double getTotttc() {
		return totttc;
	}
	public void setTotttc(double totttc) {
		this.totttc = totttc;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	@Override
	public String toString() {
		return "ListComm [id=" + id + ", codeart=" + codeart + ", libelle=" + libelle + ", pv=" + pv + ", qte=" + qte
				+ ", tva=" + tva + ", tottht=" + tottht + ", tottva=" + tottva + ", totttc=" + totttc + ", nom=" + nom
				+ ", code=" + code + "]";
	}
	public ListComm(long id, String codeart, String libelle, int pv, double qte, int tva, double tottht, double tottva,
			double totttc, String nom, String code) {
		super();
		this.id = id;
		this.codeart = codeart;
		this.libelle = libelle;
		this.pv = pv;
		this.qte = qte;
		this.tva = tva;
		this.tottht = tottht;
		this.tottva = tottva;
		this.totttc = totttc;
		this.nom = nom;
		this.code = code;
	}
	public ListComm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
