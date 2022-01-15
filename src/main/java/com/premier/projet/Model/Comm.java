package com.premier.projet.Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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


@Entity
@Table(name = "commande")

public class Comm {
	@Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private long id;
	  private int annee;
	  private int numero;
	  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="GMT")
	  private Date date_mvt;
	  private int code;
	  private String nom;
	  private double tottht;
	  private double tottva;
	  private double totttc;
	
	@JsonManagedReference
	  @JsonIgnore
	  @OneToMany(mappedBy = "comm", fetch=FetchType.EAGER)
      @Valid
	  private List<Lcomm> lcomms = new ArrayList<>();

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

	public Date getDate_mvt() {
		return date_mvt;
	}

	public void setDate_mvt(Date date_mvt) {
		this.date_mvt = date_mvt;
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

	public List<Lcomm> getLcomms() {
		return lcomms;
	}

	public void setLcomms(List<Lcomm> lcomms) {
		this.lcomms = lcomms;
	}

	@Override
	public String toString() {
		return "Comm [id=" + id + ", annee=" + annee + ", numero=" + numero + ", date_comm=" + date_mvt + ", code="
				+ code + ", nom=" + nom + ", tottht=" + tottht + ", tottva=" + tottva + ", totttc=" + totttc
				+ ", lcomms=" + lcomms + "]";
	}

	public Comm(long id, int annee, int numero, Date date_mvt, int code, String nom, double tottht, double tottva,
			double totttc, @Valid List<Lcomm> lcomms) {
		super();
		this.id = id;
		this.annee = annee;
		this.numero = numero;
		this.date_mvt = date_mvt;
		this.code = code;
		this.nom = nom;
		this.tottht = tottht;
		this.tottva = tottva;
		this.totttc = totttc;
		this.lcomms = lcomms;
	}

	public Comm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
