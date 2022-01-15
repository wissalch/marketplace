package com.premier.projet.Model;

	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;
	import javax.persistence.Table;
	@Entity
	@Table(name = "societe")

public class Societe {
		@Id
		  @GeneratedValue(strategy = GenerationType.AUTO)
		  private long id;
		  private String libelle;
		  private String libcourt;
		  private String adresse;
		  private String tel1;
		  private String email;
		  private String matf;
		  private String rib;
		  private int numc;
		  private int numf;
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getLibelle() {
			return libelle;
		}
		public void setLibelle(String libelle) {
			this.libelle = libelle;
		}
		public String getLibcourt() {
			return libcourt;
		}
		public void setLibcourt(String libcourt) {
			this.libcourt = libcourt;
		}
		public String getAdresse() {
			return adresse;
		}
		public void setAdresse(String adresse) {
			this.adresse = adresse;
		}
		public String getTel1() {
			return tel1;
		}
		public void setTel1(String tel1) {
			this.tel1 = tel1;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getMatf() {
			return matf;
		}
		public void setMatf(String matf) {
			this.matf = matf;
		}
		public String getRib() {
			return rib;
		}
		public void setRib(String rib) {
			this.rib = rib;
		}
		public int getNumc() {
			return numc;
		}
		public void setNumc(int numc) {
			this.numc = numc;
		}
		public int getNumf() {
			return numf;
		}
		public void setNumf(int numf) {
			this.numf = numf;
		}
		@Override
		public String toString() {
			return "Societe [id=" + id + ", libelle=" + libelle + ", libcourt=" + libcourt + ", adresse=" + adresse
					+ ", tel1=" + tel1 + ", email=" + email + ", matf=" + matf + ", rib=" + rib + ", numc=" + numc
					+ ", numf=" + numf + "]";
		}
		public Societe(long id, String libelle, String libcourt, String adresse, String tel1, String email, String matf,
				String rib, int numc, int numf) {
			super();
			this.id = id;
			this.libelle = libelle;
			this.libcourt = libcourt;
			this.adresse = adresse;
			this.tel1 = tel1;
			this.email = email;
			this.matf = matf;
			this.rib = rib;
			this.numc = numc;
			this.numf = numf;
		}
		public Societe() {
			super();
			// TODO Auto-generated constructor stub
		}
		
}
