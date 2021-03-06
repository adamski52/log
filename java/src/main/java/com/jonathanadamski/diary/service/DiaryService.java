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
            entity.setIsProblematic(payload.getIsProblematic());
            entity.setIsGood(payload.getIsGood());
            entity.setExercise(payload.getExercise());
            entity.setActivity(payload.getActivity());
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
    }

    public DiaryEntry create(DiaryEntryCreatePayload payload) throws Err {
        validate(payload);

        if(payload.getThoughts() == null) {
            payload.setThoughts("");
        }

        if(payload.getActivity() == null) {
            payload.setActivity("");
        }

        if(payload.getExercise() == null) {
            payload.setExercise("");
        }

        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        DiaryEntry diaryEntry = new DiaryEntry();
        mapEntity(diaryEntry, payload);

        entityManager.persist(diaryEntry);

        transaction.commit();
        return diaryEntry;
    }

    public DiaryEntry delete(long id) throws Err {
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        try {
            DiaryEntry diaryEntry = entityManager.getReference(DiaryEntry.class, id);

            entityManager.remove(diaryEntry);

            transaction.commit();

            return diaryEntry;
        }
        catch(Exception e) {
            throw new NotFoundException(id);
        }
    }

    public DiaryEntry update(long id, DiaryEntryUpdatePayload payload) throws Err {
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
        Query query = entityManager.createQuery("SELECT d FROM DiaryEntry d ORDER BY date DESC, slot DESC");
        return query.getResultList();
    }

    public DiaryEntry findOne(long id) throws Err {
        return entityManager.getReference(DiaryEntry.class, id);
    }
}