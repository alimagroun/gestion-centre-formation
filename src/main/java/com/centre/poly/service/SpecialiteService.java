package com.centre.poly.service;

import com.centre.poly.dto.ResponseDto;
import com.centre.poly.model.Specialite;

public interface SpecialiteService {
    ResponseDto save(Specialite discipline);

    ResponseDto delete(Long id);
}
