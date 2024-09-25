package com.centre.poly.classmanagement.mapper;


import com.centre.poly.classmanagement.dto.DomaineRequest;
import com.centre.poly.classmanagement.dto.DomaineResponse;
import com.centre.poly.classmanagement.entity.Domaine;
import org.springframework.stereotype.Service;

@Service
public class DomaineMapper {

    public Domaine toRequest(DomaineRequest request){
        Domaine domaine = new Domaine();
        domaine.setName(request.name());
        domaine.setDescription(request.description());
        return domaine;
    }

    public DomaineResponse toResponse(Domaine formation){
        DomaineResponse domaineResponse = new DomaineResponse();
        domaineResponse.setId(formation.getId());
        domaineResponse.setName(formation.getName());
        domaineResponse.setDescription(formation.getDescription());
        return domaineResponse;
    }

}
