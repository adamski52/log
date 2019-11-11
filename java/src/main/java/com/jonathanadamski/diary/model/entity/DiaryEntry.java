package com.jonathanadamski.diary.model.entity;

import com.jonathanadamski.diary.model.DiaryHungerRating;
import com.jonathanadamski.diary.model.DiarySlot;
import lombok.Data;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Entity
@Data
public class DiaryEntry {

    @Id
    @GeneratedValue
    private long id;

    private Calendar date = new Calendar.Builder().build();
    private int slot;
    private String food;
    private String thoughts;
    private String activity;
    private Boolean isProblematic;
    private int hunger;

    public void setDate(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateWithTime = sdf.parse(date);
        this.date.setTime(dateWithTime);
    }

    public void setSlot(int slot) {
        int min = DiarySlot.BREAKFAST.getValue();
        int max = DiarySlot.EVENING_SNACK.getValue();
        if(slot > max) {
            slot = max;
        } else if(slot < min) {
            slot = min;
        }
        this.slot = slot;
    }

    public void setHunger(int hunger) {
        int min = DiaryHungerRating.PAINFULLY_FULL.getValue();
        int max = DiaryHungerRating.PAINFULLY_HUNGRY.getValue();
        if(hunger > max) {
            hunger = max;
        } else if(hunger < min) {
            hunger = min;
        }
        this.hunger = hunger;
    }
}
