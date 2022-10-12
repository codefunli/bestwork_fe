package com.nineplus.bestwork.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity(name = "TCompany")
@Table(name = "T_COMPANY")
@Data
public class TCompany implements Serializable {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 19)
    private Long id;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "email")
    private String cpEmail;

    @Column(name = "tel_no")
    private String cpTelNo;

    @Column(name = "tax_no")
    private String taxNo;
 
    @Column(name = "province_city")
    private String city;

    @Column(name = "district")
    private String district;

    @Column(name = "ward")
    private String ward;

    @Column(name = "street")
    private String street;

    @Column(name = "detail_address")
    private String detailAddress;
    
    // update registration
    @Column(name = "start_date")
    private String startDate;

    @Column(name = "expired_date")
    private String expiredDate;
    
    @Column(name = "is_expired")
    private boolean isExpired;

    @Column(columnDefinition = "bit(1) default 0")
    private Boolean isDeleted;
    
	/*
	 * @Override public boolean equals(Object o) { if (o == this) { return true; }
	 * if (!(o instanceof TCompany)) { return false; } TCompany other = (TCompany)
	 * o; boolean valueEquals = (this.id == null && other.id == null) || (this.id !=
	 * null && this.id.equals(other.id)); return valueEquals; }
	 * 
	 * @Override public int hashCode() { int hash = 7; hash = 31 * hash +
	 * id.intValue(); hash = 31 * hash + (companyName == null ? 0 :
	 * companyName.hashCode()); return hash; }
	 */
}
