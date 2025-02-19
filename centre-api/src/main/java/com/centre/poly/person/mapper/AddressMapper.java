package com.centre.poly.person.mapper;

import com.centre.poly.person.dto.AddressRequest;
import com.centre.poly.person.entity.Address;
import org.springframework.stereotype.Service;

@Service
public class AddressMapper {

  public Address ToAddress(AddressRequest addressRequest) {
    if (addressRequest == null) {
      return null;
    }

    Address address = new Address();
    address.setCity(addressRequest.city());
    address.setZipCode(addressRequest.zipCode());
    address.setStreet(addressRequest.street());
    return address;
  }
}
