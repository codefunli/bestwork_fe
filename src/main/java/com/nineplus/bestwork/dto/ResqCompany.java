package com.nineplus.bestwork.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResqCompany {
    private Integer page = 0;
    private Integer size = 5;
    private String sort = "id, asc";
    private String companyName = "";
    private String cpEmail = "";
    private String cpTelNo = "";
    private String taxNo = "";
    private List<String> ids = new ArrayList<>();
    private Long id;
}
