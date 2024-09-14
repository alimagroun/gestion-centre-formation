package com.centre.poly.document;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DocumentResponse {

    private Long id;
    private String name;
    private String description;
}
