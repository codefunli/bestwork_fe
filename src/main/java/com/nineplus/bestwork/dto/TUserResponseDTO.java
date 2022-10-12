package com.nineplus.bestwork.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class TUserResponseDTO extends BaseDTO  {
	/**
     * serialVersionUID
     */
    private static final long serialVersionUID = 7969015153524943561L;

    @JsonProperty("id")
    private long id;

    @JsonProperty("userId")
    private String userId;

    @JsonProperty("currentCompanyId")
    private long currentCompanyId;

    @JsonProperty("enabled")
    private Boolean enabled;

    @JsonProperty("role")
    private String role;

    @JsonProperty("userNm")
    private String userNm;

    @JsonProperty("email")
    private String email;

    @JsonProperty("firstNm")
    private String firstNm;

    @JsonProperty("lastNm")
    private String lastNm;

    @JsonProperty("isDeleted")
    private boolean isDeleted;

    @JsonProperty("isBlocked")
    private boolean isBlocked;

    @JsonProperty("countLoginFailed")
    private int countLoginFailed;

    @JsonProperty("createdDt")
    private LocalDateTime createDt;

    @JsonProperty("updatedDt")
    private LocalDateTime updatedDt;
}
