package com.jonathanadamski.diary.service;

import com.jonathanadamski.diary.exception.InvalidAPIKeyException;
import com.jonathanadamski.diary.model.entity.APIUser;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
    private UserService userService;

    @Mock
    private EntityManager entityManager;

    @Mock
    private TypedQuery query;

    @Rule
    public ExpectedException exception = ExpectedException.none();

    private String apiKey;

    @Before
    public void onBefore() {
        apiKey = UUID.randomUUID().toString();
//        when(query.setParameter(anyString(), anyString())).thenReturn(query);
//        when(query.getSingleResult()).thenThrow(NoResultException.class);

        //when(entityManager.createQuery(anyString(), any(APIUser.class))).thenReturn(query);

        userService = new UserService();
        userService.setEntityManager(entityManager);
    }

    @Test
    public void validateApiKey_shouldThrowIfNull() {
        exception.expect(InvalidAPIKeyException.class);
        userService.validateApiKey(null);
    }

    @Test
    public void validateApiKey_shouldThrowIfBlank() {
        exception.expect(InvalidAPIKeyException.class);
        userService.validateApiKey("");
    }

//    @Test
//    public void validateApiKey_shouldThrowIfNoMatchFound() {
//        exception.expect(InvalidAPIKeyException.class);
//        userService.validateApiKey(apiKey);
//    }
}