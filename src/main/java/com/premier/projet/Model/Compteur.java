package com.premier.projet.Model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "compteur")
public class Compteur {
	@Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private long id;
	private int annee;
	private long numpanier;
	private long numcomm;
	private long Numbl;
	
	public long getNumbl() {
		return Numbl;
	}
	public void setNumbl(long numbl) {
		Numbl = numbl;
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
	public long getNumpanier() {
		return numpanier;
	}
	public void setNumpanier(long numpanier) {
		this.numpanier = numpanier;
	}
	public long getNumcomm() {
		return numcomm;
	}
	public void setNumcomm(long numcomm) {
		this.numcomm = numcomm;
	}
	@Override
	public String toString() {
		return "Compteur [id=" + id + ", annee=" + annee + ", numpanier=" + numpanier + ", numcomm=" + numcomm
				+ ", Numbl=" + Numbl + "]";
	}
	public Compteur(long id, int annee, long numpanier, long numcomm, long numbl) {
		super();
		this.id = id;
		this.annee = annee;
		this.numpanier = numpanier;
		this.numcomm = numcomm;
		Numbl = numbl;
	}
	public Compteur() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
