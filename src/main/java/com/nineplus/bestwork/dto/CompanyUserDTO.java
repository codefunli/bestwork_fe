package com.nineplus.bestwork.dto;

import com.nineplus.bestwork.entity.TCompany;
import com.nineplus.bestwork.entity.TUser;
import lombok.Data;

@Data
public class CompanyUserDTO {
    private TCompany tCompany;
    private TUser tUser;
}
