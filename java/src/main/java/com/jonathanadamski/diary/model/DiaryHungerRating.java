package com.jonathanadamski.diary.model;

import java.util.HashMap;
import java.util.Map;

public enum DiaryHungerRating {
    PAINFULLY_FULL(0),
    UNCOMFORTABLY_FULL(1),
    VERY_FULL(2),
    SATISFIED(3),
    MINDFUL_FULLNESS(4),
    NEUTRAL(5),
    HUNGRY(6),
    VERY_HUNGRY(7),
    UNCOMFORTABLY_HUNGRY(8),
    PAINFULLY_HUNGRY(9);

    private int value;
    private static Map map = new HashMap<>();

    DiaryHungerRating(int value) {
        this.value = value;
    }

    static {
        for (DiaryHungerRating diaryHungerRating : DiaryHungerRating.values()) {
            map.put(diaryHungerRating.value, diaryHungerRating);
        }
    }

    public static DiaryHungerRating valueOf(int diarySlot) {
        return (DiaryHungerRating) map.get(diarySlot);
    }

    public int getValue() {
        return value;
    }
}