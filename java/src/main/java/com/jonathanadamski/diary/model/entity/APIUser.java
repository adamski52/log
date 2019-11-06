package com.jonathanadamski.diary.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
public class APIUser {
    @Id
    @GeneratedValue
    private long id;

    private UUID apiKey;

    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;
}
