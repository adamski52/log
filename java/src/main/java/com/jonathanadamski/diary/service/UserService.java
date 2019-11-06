package com.jonathanadamski.diary.service;

import com.google.inject.Inject;
import com.jonathanadamski.diary.exception.InvalidAPIKeyException;
import com.jonathanadamski.diary.exception.InvalidAuthException;
import com.jonathanadamski.diary.exception.InvalidFieldException;
import com.jonathanadamski.diary.exception.ServerException;
import com.jonathanadamski.diary.model.entity.APIUser;
import com.jonathanadamski.diary.model.payload.APIUserCreatePayload;
import lombok.Data;
import org.jooby.Err;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Data
public class UserService {
    @Inject
    private EntityManager entityManager;

    private String salt;

    public void validateApiKey(String apiKey) throws InvalidFieldException {
        if(apiKey == null || apiKey.equals("")) {
            throw new InvalidAPIKeyException();
        }

        TypedQuery<APIUser> query = entityManager.createQuery("SELECT u FROM APIUser u WHERE u.apiKey = :apiKey", APIUser.class);
        query.setParameter("apiKey", UUID.fromString(apiKey));
        try {
            query.getSingleResult();
        }
        catch (Exception e) {
            throw new InvalidAPIKeyException();
        }
    }


    public void validate(APIUserCreatePayload payload) throws InvalidFieldException {
        if(payload == null) {
            throw new InvalidFieldException("payload", null);
        }

        if(payload.getUsername() == null || payload.getUsername().equals("")) {
            throw new InvalidFieldException("username", payload.getUsername());
        }

        if(payload.getPassword() == null || payload.getPassword().equals("")) {
            throw new InvalidFieldException("password", "{hidden}");
        }
    }

    private String getEncryptedPassword(String plaintext) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(salt.getBytes());
        byte[] bytes = messageDigest.digest(plaintext.getBytes());

        StringBuilder stringBuilder = new StringBuilder();
        for(byte b : bytes) {
            stringBuilder.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
        }
        return stringBuilder.toString();
    }

    public APIUser create(APIUserCreatePayload payload) throws Err {
        validate(payload);
        try {
            String password = getEncryptedPassword(payload.getPassword());
            System.out.println("PW: " + password + ", SALT: " + salt);
            EntityTransaction transaction = entityManager.getTransaction();
            transaction.begin();

            APIUser apiUser = new APIUser();
            apiUser.setUsername(payload.getUsername());
            apiUser.setPassword(password);
            apiUser.setApiKey(UUID.randomUUID());

            entityManager.persist(apiUser);

            transaction.commit();
            return apiUser;
        }
        catch(NoSuchAlgorithmException e) {
            throw new ServerException();
        }
    }

    public APIUser findOne(APIUserCreatePayload payload) {
        validate(payload);
        try {
            String password = getEncryptedPassword(payload.getPassword());
            System.out.println("PW: " + password + ", SALT: " + salt);

            TypedQuery<APIUser> query = entityManager.createQuery("SELECT u FROM APIUser u WHERE u.username = :username AND u.password = :password", APIUser.class);
            query.setParameter("username", payload.getUsername());
            query.setParameter("password", password);
            return query.getSingleResult();
        }
        catch(NoSuchAlgorithmException e) {
            throw new ServerException();
        }
        catch(NoResultException e) {
            throw new InvalidAuthException();
        }
    }
}
