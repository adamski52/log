package com.jonathanadamski.diary.model.payload;

import lombok.Data;

@Data
public class DiaryEntryCreatePayload {
    private String date;
    private int slot;
    private String food;
    private String thoughts;
    private int hunger;
    private String exercise;
    private Boolean isGood;
    private String activity;
    private Boolean isProblematic;
}
