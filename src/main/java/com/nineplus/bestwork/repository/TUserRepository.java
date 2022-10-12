package com.nineplus.bestwork.repository;

import java.util.List;

import com.nineplus.bestwork.dto.ResqUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nineplus.bestwork.entity.TUser;

@Repository
public interface TUserRepository extends JpaRepository <TUser, Long>  {
	TUser findByUserName(String userNm);

	@Query(value = "select u.* from T_USER u JOIN T_COMPANY_USER tcu ON (u.id = tcu.user_id) where tcu.company_id = :companyId", nativeQuery = true)
    List<TUser> findAllUserByCompanyId(Long companyId);

	@Query(value = " select tu.* from t_user tu " +
            " join t_company_user tcu on tu.id = tcu.user_id " +
            " join t_company tc on tc.id = tcu.company_id " +
            " where tc.id = :id " , nativeQuery = true)
    TUser findUserByCompanyId(@Param("id") Long id);

	@Query(value = " select * from t_user where cur_company_id like :#{#resqUser.companyId} and enabled = :#{#resqUser.enabled} " +
			" and ( email like :#{#resqUser.keyword} or first_nm like :#{#resqUser.keyword} or last_nm like :#{#resqUser.keyword} or user_name like :#{#resqUser.keyword} ) ", nativeQuery = true)
	Page<TUser> findAllUsers(Pageable pageable, ResqUser resqUser);
}
