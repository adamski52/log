package com.jonathanadamski.diary.model.payload;

import lombok.Data;

@Data
public class DiaryEntryUpdatePayload extends DiaryEntryCreatePayload {
    private long id;
}
