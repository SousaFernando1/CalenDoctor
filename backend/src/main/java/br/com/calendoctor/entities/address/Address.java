package br.com.calendoctor.entities.address;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "Address")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uf")
    private String uf;

    @Column(name = "city")
    private String city;

    @Column(name = "code")
    private String code;

    @Column(name = "address")
    private String address;

    @Column(name = "district")
    private String district;

}
