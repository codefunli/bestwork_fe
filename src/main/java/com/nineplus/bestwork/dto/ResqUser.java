package com.nineplus.bestwork.dto;

import com.nineplus.bestwork.entity.TUser;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResqUser {
    private Integer page = 0;
    private Integer size = 5;
    private String sort = "id, asc";

    private String companyId;

    private String keyword = "";

    private Object enabled = false;

    private String role = "";

    private List<String> ids = new ArrayList<>();

    private TUser tUser = new TUser();
}
