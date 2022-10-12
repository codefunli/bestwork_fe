package com.nineplus.bestwork.dto;

import lombok.Data;

@Data
public class ResqProject {
    private Integer page = 0;
    private Integer size = 5;
    private String sort = "id, asc";
}
