package com.jonathanadamski.diary.service;

import com.google.inject.Inject;
import com.jonathanadamski.diary.exception.InvalidFieldException;
import com.jonathanadamski.diary.exception.InvalidIdException;
import com.jonathanadamski.diary.exception.NotFoundException;
import com.jonathanadamski.diary.model.entity.DiaryEntry;
import com.jonathanadamski.diary.model.payload.DiaryEntryCreatePayload;
import com.jonathanadamski.diary.model.payload.DiaryEntryUpdatePayload;
import lombok.Data;
import org.jooby.Err;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import java.text.ParseException;
import java.util.List;

@Data
public class DiaryService {
    @Inject
    private EntityManager entityManager;

    private void mapEntity(DiaryEntry entity, DiaryEntryCreatePayload payload) throws Err {
        try {
            entity.setDate(payload.getDate());
            entity.setSlot(payload.getSlot());
            entity.setFood(payload.getFood());
            entity.setThoughts(payload.getThoughts());
            entity.setHunger(payload.getHunger());
        }
        catch (ParseException e) {
            throw new InvalidFieldException("date", payload.getDate());
        }
    }

    private void validate(DiaryEntryCreatePayload payload) throws Err {
        if(payload == null) {
            throw new InvalidFieldException("payload", null);
        }

        if(payload.getDate() == null || payload.getDate().equals("")) {
            throw new InvalidFieldException("date", payload.getDate());
        }

        if(payload.getFood() == null || payload.getFood().equals("")) {
            throw new InvalidFieldException("food", payload.getFood());
        }

        if(payload.getThoughts() == null || payload.getThoughts().equals("")) {
            throw new InvalidFieldException("thoughts", payload.getThoughts());
        }
    }

    public DiaryEntry create(DiaryEntryCreatePayload payload) throws Err {
        validate(payload);

        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        DiaryEntry diaryEntry = new DiaryEntry();
        mapEntity(diaryEntry, payload);

        entityManager.persist(diaryEntry);

        transaction.commit();
        return diaryEntry;
    }

    public DiaryEntry update(long id, DiaryEntryUpdatePayload payload) throws Err{
        if(id != payload.getId()) {
            throw new InvalidIdException(id);
        }

        validate(payload);


        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        try {
            DiaryEntry diaryEntry = entityManager.getReference(DiaryEntry.class, payload.getId());

            mapEntity(diaryEntry, payload);

            entityManager.persist(diaryEntry);

            transaction.commit();
            return diaryEntry;
        }
        catch(Exception e) {
            throw new NotFoundException(payload.getId());
        }
    }

    public List<DiaryEntry> findAll() throws Err {
        Query query = entityManager.createQuery("SELECT d FROM DiaryEntry d");
        return query.getResultList();
    }
}