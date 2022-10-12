package com.nineplus.bestwork.repository;

import com.nineplus.bestwork.dto.ResqCompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nineplus.bestwork.entity.TCompany;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TCompanyRepository extends JpaRepository<TCompany, Long> {

    @Query(value = " SELECT * FROM T_COMPANY WHERE " +
            " company_name like  :#{#resqCompany.companyName} " +
            " and email like :#{#resqCompany.cpEmail} " +
            " and tel_no like :#{#resqCompany.cpTelNo} " +
            " and tax_no like :#{#resqCompany.taxNo} and is_deleted = 0 ",
            nativeQuery = true,
    countQuery = " select count(*) from ( SELECT * FROM T_COMPANY WHERE " +
            " company_name like :#{#resqCompany.companyName} " +
            " and email like :#{#resqCompany.cpEmail} " +
            " and tel_no like :#{#resqCompany.cpTelNo} " +
            " and tax_no like :#{#resqCompany.taxNo} and is_deleted = 0 ) temp ")
    Page<TCompany> getAllCompanies(Pageable pageable, ResqCompany resqCompany);

    @Transactional
    @Modifying
    @Query(value = " update t_company set is_deleted = 1 where id = :id ", nativeQuery = true)
    void deleteCompany(@Param("id") Long id);


    //@Query(value = "SELECT * FROM T_COMPANY WHERE companyId = :companyId", nativeQuery = true)
    //TCompany findByCompanyId(Long companyId);

}
