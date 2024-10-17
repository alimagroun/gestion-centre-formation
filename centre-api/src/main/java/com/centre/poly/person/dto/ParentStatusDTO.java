package com.centre.poly.person.dto;

import com.centre.poly.person.entity.MaritalStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParentStatusDTO {

    private MaritalStatus maritalStatus;
    private Boolean isFatherDeceased;
    private Boolean isMatherDeceased;

}
