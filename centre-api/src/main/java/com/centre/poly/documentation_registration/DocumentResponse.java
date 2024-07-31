package com.centre.poly.documentation_registration;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DocumentResponse {

    private Integer id;
    private String name;
    private String description;
}
