package com.nineplus.bestwork.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity(name = "TUser")
@Table(name = "t_user")
@Data
public class TUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false, precision = 19)
    private long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "cur_company_id", nullable = false)
    private Long currentCompanyId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "first_nm", nullable = false)
    private String firstNm;
    
    @Column(name = "last_nm", nullable = false)
    private String lastNm;

    @JsonProperty("uEmail")
    @Column(name = "email", nullable = false)
    private String uEmail;

    @Column(name = "enabled", nullable = false, length = 3)
    private boolean enabled;
    
    @Column(name = "is_deleted", nullable = false, length = 3)
    private boolean isDeleted;

    @Column(name = "count_login_failed", nullable = false)
    private int countLoginFailed;
   
    @UpdateTimestamp
    @Column(name = "update_dt", nullable = false)
    private LocalDateTime updatedDt;

    @Column(name = "token")
    private String token;

    @JsonProperty("uTelNo")
    @Column(name = "tel_no")
    private String uTelNo;
    @ManyToOne
    @JoinColumn(name = "role_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private TRole role;

    @JsonBackReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "T_COMPANY_USER", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "company_id"))
    Set<TCompany> companys;
}
