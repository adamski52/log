package com.jonathanadamski.diary.model.payload;

import lombok.Data;

@Data
public class APIUserCreatePayload {
    private String username;
    private String password;
}
