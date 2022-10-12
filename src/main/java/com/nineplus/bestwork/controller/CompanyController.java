package com.nineplus.bestwork.controller;

import com.nineplus.bestwork.dto.*;
import com.nineplus.bestwork.entity.TCompany;
import com.nineplus.bestwork.entity.TUser;
import com.nineplus.bestwork.repository.TCompanyRepository;
import com.nineplus.bestwork.repository.TUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.nineplus.bestwork.exception.BestWorkBussinessException;
import com.nineplus.bestwork.services.CompanyService;
import com.nineplus.bestwork.utils.CommonConstants;

import java.util.HashSet;
import java.util.Set;

@RequestMapping(value = "/api/v1/companies")
@RestController
public class CompanyController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(CompanyController.class);

    @Autowired
    CompanyService companyService;

    @Autowired
	TCompanyRepository tCompanyRepository;

    @Autowired
    TUserRepository tUserRepository;

    @PostMapping("")
    public ResponseEntity<? extends Object> getCompanies(@RequestBody(required = false) ResqCompany resqCompany) {
        System.err.println(resqCompany);
        resqCompany.setCompanyName("%" + resqCompany.getCompanyName() + "%");
        resqCompany.setCpEmail("%" + resqCompany.getCpEmail() + "%");
        resqCompany.setCpTelNo("%" + resqCompany.getCpTelNo() + "%");
        resqCompany.setTaxNo("%" + resqCompany.getTaxNo() + "%");

		Sort sortable = getSorts(resqCompany.getSort());
		Pageable pageable = PageRequest.of(resqCompany.getPage(), resqCompany.getSize(), sortable);
		Page<TCompany> companyPage = tCompanyRepository.getAllCompanies(pageable, resqCompany);
        return success(CommonConstants.MessageCode.CPN0002, companyPage, null);
    }
	private Sort getSorts(String sort) {
        if (sort.contains("asc")) {
            return Sort.by(Sort.Order.asc(sort.split(",")[0].replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase()));
        } else {
            return Sort.by(Sort.Order.desc(sort.split(",")[0].replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase()));
        }
	}

    /**
     * Create a company admin
     *
     * @param rCompanyUserReqDTO
     * @return
     * @throws BestWorkBussinessException
     */
    @PostMapping("/create")
    public ResponseEntity<? extends Object> register(@RequestBody RCompanyUserReqDTO rCompanyUserReqDTO) throws BestWorkBussinessException {
        rCompanyUserReqDTO.getCompany().setCompanyId((long) (Math.random() * 99));
        rCompanyUserReqDTO.getCompany().setDetailAddress("abc");
        rCompanyUserReqDTO.getCompany().setId(String.valueOf(Math.random() * 99));
        rCompanyUserReqDTO.getUser().setUserId(String.valueOf(Math.random() * 99));
        rCompanyUserReqDTO.getUser().setId(String.valueOf(Math.random() * 99));
        System.out.println(rCompanyUserReqDTO);

        try {
            companyService.registCompany(rCompanyUserReqDTO);
        } catch (BestWorkBussinessException ex) {
            return failed(ex.getMsgCode(), ex.getParam());
        }
        return success(CommonConstants.MessageCode.CPN0001, null, null);
    }


    /**
     * Update a company information
     *
     * @param rCompanyReqDTO
     * @return
     * @throws BestWorkBussinessException
     */
    @PutMapping("/update")
    public ResponseEntity<? extends Object> update(@RequestBody RCompanyReqDTO rCompanyReqDTO) throws BestWorkBussinessException {
        RCompanyResDTO rCompanyResDTO = null;
        try {
            rCompanyResDTO = companyService.updateCompany(rCompanyReqDTO);
        } catch (BestWorkBussinessException ex) {
            return failed(ex.getMsgCode(), ex.getParam());
        }
        return success(CommonConstants.MessageCode.CPN0002, rCompanyResDTO, null);
    }



//    @DeleteMapping("/delete/{tCompanyId}")
//    public ResponseEntity<? extends Object> delete(@PathVariable long tCompanyId) throws BestWorkBussinessException {
//        try {
//            companyService.deleteCompany(tCompanyId);
//        } catch (BestWorkBussinessException ex) {
//            return failed(ex.getMsgCode(), ex.getParam());
//        }
//        return success(CommonConstants.MessageCode.CPN0001, null, null);
//    }

    @PostMapping("/delete")
    public ResponseEntity<? extends Object> deleteAll(@RequestBody ResqCompany resqCompany) {
        for (String id : resqCompany.getIds()) {
            System.err.println("ID: " + id);
            this.tCompanyRepository.deleteCompany(Long.valueOf(id));
        }
        return success(CommonConstants.MessageCode.CPN0005, null, null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<? extends Object> findById(@PathVariable String id) {
        TCompany tCompany = this.tCompanyRepository.findById(Long.valueOf(id)).orElse(null);
        System.err.println(tCompany);
        if (tCompany == null) {
            return failed(CommonConstants.MessageCode.E1X0003, null);
        }
        TUser tUser = this.tUserRepository.findUserByCompanyId(tCompany.getId());
        System.err.println(tUser);

        CompanyUserDTO companyUserDTO = new CompanyUserDTO();
        companyUserDTO.setTCompany(tCompany);
        if (tUser != null) {
            companyUserDTO.setTUser(tUser);
        } else {
            companyUserDTO.setTUser(new TUser());
        }
        return success(CommonConstants.MessageCode.CPN0005, companyUserDTO, null);
    }

    @PostMapping("/updates")
    public ResponseEntity<? extends Object> updateCompanyUser(@RequestBody CompanyUserDTO companyUserDTO) {
        System.err.println(companyUserDTO);
        tCompanyRepository.save(companyUserDTO.getTCompany());
        Set<TCompany> tCompanySet = new HashSet<>();
        tCompanySet.add(companyUserDTO.getTCompany());
        companyUserDTO.getTUser().setCompanys(tCompanySet);
        TUser tUser = this.tUserRepository.findByUserName(companyUserDTO.getTUser().getUserName());
        if (new BCryptPasswordEncoder().matches(companyUserDTO.getTUser().getPassword(), tUser.getPassword())) {
            companyUserDTO.getTUser().setPassword(tUser.getPassword());
        } else {
            companyUserDTO.getTUser().setPassword(new BCryptPasswordEncoder().encode(companyUserDTO.getTUser().getPassword()));
        }
        tUserRepository.save(companyUserDTO.getTUser());
        return success(CommonConstants.MessageCode.CPN0005, companyUserDTO, null);
    }
}
