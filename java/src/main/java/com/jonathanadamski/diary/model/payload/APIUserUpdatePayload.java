package com.jonathanadamski.diary.model.payload;

import lombok.Data;

@Data
public class APIUserUpdatePayload extends APIUserCreatePayload {
    private long id;
    private String apiKey;
}
