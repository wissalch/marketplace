package com.premier.projet.Model;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.premier.projet.Model.Llivr;
@Entity
@Table(name = "livr")

public class Livr {
	@Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private long id;
	  private int annee;
	  private int numero;
	  private int code;
	  private String libelle;
	  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="GMT")
	  private Date date_mvt;
	  private String smtva;
	  private String chauffeur;
	  private String camion;
	  private double totht;
	  private double totrem;
	  private double totfodec;
	  private double tottva;
	  private double totttc;
	  private int numfac;
	  @JsonManagedReference
	  @JsonIgnore
	  @OneToMany(mappedBy = "livr", fetch=FetchType.EAGER)
    
	  private List<Llivr> llivrs = new ArrayList<>();
	public Livr() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Livr(long id, int annee, int numero, int code, String libelle, Date date_mvt, String smtva, String chauffeur,
			String camion, double totht, double totrem, double totfodec, double tottva, double totttc, int numfac,
			@Valid List<com.premier.projet.Model.Llivr> llivrs) {
		super();
		this.id = id;
		this.annee = annee;
		this.numero = numero;
		this.code = code;
		this.libelle = libelle;
		this.date_mvt = date_mvt;
		this.smtva = smtva;
		this.chauffeur = chauffeur;
		this.camion = camion;
		this.totht = totht;
		this.totrem = totrem;
		this.totfodec = totfodec;
		this.tottva = tottva;
		this.totttc = totttc;
		this.numfac = numfac;
		this.llivrs = llivrs;
	}
	@Override
	public String toString() {
		return "Livr [id=" + id + ", annee=" + annee + ", numero=" + numero + ", code=" + code + ", libelle=" + libelle
				+ ", date_mvt=" + date_mvt + ", smtva=" + smtva + ", chauffeur=" + chauffeur + ", camion=" + camion
				+ ", totht=" + totht + ", totrem=" + totrem + ", totfodec=" + totfodec + ", tottva=" + tottva
				+ ", totttc=" + totttc + ", numfac=" + numfac + ", llivrs=" + llivrs + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getAnnee() {
		return annee;
	}
	public void setAnnee(int annee) {
		this.annee = annee;
	}
	public int getNumero() {
		return numero;
	}
	public void setNumero(int numero) {
		this.numero = numero;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getLibcl() {
		return libelle;
	}
	public void setLibcl(String libcl) {
		this.libelle = libcl;
	}
	public Date getDate_mvt() {
		return date_mvt;
	}
	public void setDate_mvt(Date date_mvt) {
		this.date_mvt = date_mvt;
	}
	public String getSmtva() {
		return smtva;
	}
	public void setSmtva(String smtva) {
		this.smtva = smtva;
	}
	public String getChauffeur() {
		return chauffeur;
	}
	public void setChauffeur(String chauffeur) {
		this.chauffeur = chauffeur;
	}
	public String getCamion() {
		return camion;
	}
	public void setCamion(String camion) {
		this.camion = camion;
	}
	public double getTotht() {
		return totht;
	}
	public void setTotht(double totht) {
		this.totht = totht;
	}
	public double getTotrem() {
		return totrem;
	}
	public void setTotrem(double totrem) {
		this.totrem = totrem;
	}
	public double getTotfodec() {
		return totfodec;
	}
	public void setTotfodec(double totfodec) {
		this.totfodec = totfodec;
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
	public int getNumfac() {
		return numfac;
	}
	public void setNumfac(int numfac) {
		this.numfac = numfac;
	}
	public List<Llivr> getLlivrs() {
		return llivrs;
	}
	public void setLlivrs(List<Llivr> llivrs) {
		this.llivrs = llivrs;
	}
	
	}
	
	


