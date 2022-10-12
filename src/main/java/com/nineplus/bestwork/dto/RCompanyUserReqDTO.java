package com.nineplus.bestwork.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class RCompanyUserReqDTO {
	
	 @JsonProperty("company")
	    private RCompanyReqDTO company;

	 @JsonProperty("user")
	    private UserReqDTO user;

}
