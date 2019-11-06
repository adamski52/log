package com.jonathanadamski.diary.model;

import java.util.HashMap;
import java.util.Map;

public enum DiarySlot {
    BREAKFAST(0),
    MORNING_SNACK(1),
    LUNCH(2),
    AFTERNOON_SNACXK(3),
    DINNER(4),
    EVENING_SNACK(5);

    private int value;
    private static Map map = new HashMap<>();

    DiarySlot(int value) {
        this.value = value;
    }

    static {
        for (DiarySlot diarySlot : DiarySlot.values()) {
            map.put(diarySlot.value, diarySlot);
        }
    }

    public static DiarySlot valueOf(int diarySlot) {
        return (DiarySlot) map.get(diarySlot);
    }

    public int getValue() {
        return value;
    }
}