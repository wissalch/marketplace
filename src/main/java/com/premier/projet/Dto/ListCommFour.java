package com.premier.projet.Dto;

public class ListCommFour {
	private long id;
	//lcomm
	private int numero ;
	  private String codeart;
	  private String Libart;
	  private int pu;
	  private double qte;
	  private int tva;
	  private double totht;
	  private double tottva;
	  private double totttc;
	  //comm
	  private int code;
	  private String nom;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getNumero() {
		return numero;
	}
	public void setNumero(int numero) {
		this.numero = numero;
	}
	public String getCodeart() {
		return codeart;
	}
	public void setCodeart(String codeart) {
		this.codeart = codeart;
	}
	public String getLibart() {
		return Libart;
	}
	public void setLibart(String libart) {
		Libart = libart;
	}
	public int getPu() {
		return pu;
	}
	public void setPu(int pu) {
		this.pu = pu;
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
	public double getTotht() {
		return totht;
	}
	public void setTotht(double totht) {
		this.totht = totht;
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
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getNom() {
		return nom;
	}
	
	public void setNom(String nom) {
		this.nom = nom;
	}
	@Override
	public String toString() {
		return "ListCommFour [id=" + id + ", numero=" + numero + ", codeart=" + codeart + ", Libart=" + Libart + ", pu="
				+ pu + ", qte=" + qte + ", tva=" + tva + ", totht=" + totht + ", tottva=" + tottva + ", totttc="
				+ totttc + ", code=" + code + ", nom=" + nom + "]";
	}
	public ListCommFour(long id, int numero, String codeart, String libart, int pu, double qte, int tva, double totht,
			double tottva, double totttc, int code, String nom) {
		super();
		this.id = id;
		this.numero = numero;
		this.codeart = codeart;
		Libart = libart;
		this.pu = pu;
		this.qte = qte;
		this.tva = tva;
		this.totht = totht;
		this.tottva = tottva;
		this.totttc = totttc;
		this.code = code;
		this.nom = nom;
	}
	public ListCommFour() {
		super();
		// TODO Auto-generated constructor stub
	}

}
