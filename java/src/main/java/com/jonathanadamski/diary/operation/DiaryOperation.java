package com.jonathanadamski.diary.operation;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.jonathanadamski.diary.model.entity.APIUser;
import com.jonathanadamski.diary.model.entity.DiaryEntry;
import com.jonathanadamski.diary.model.payload.APIUserCreatePayload;
import com.jonathanadamski.diary.model.payload.DiaryEntryCreatePayload;
import com.jonathanadamski.diary.model.payload.DiaryEntryUpdatePayload;
import com.jonathanadamski.diary.service.DiaryService;
import com.jonathanadamski.diary.service.UserService;
import org.jooby.Err;
import org.jooby.Request;
import org.jooby.Response;
import org.jooby.mvc.*;

import java.util.List;

@Singleton
@Path("/api/diary")
@Produces("application/json")
public class DiaryOperation {
    private DiaryService diaryService;
    private UserService userService;

    @Inject
    public DiaryOperation(DiaryService diaryService, UserService userService) throws Err {
        this.diaryService = diaryService;
        this.userService = userService;
    }

    @POST
    public DiaryEntry create(@Body DiaryEntryCreatePayload payload, Request req, Response res) throws Err {
        String apiKey = req.header("X-API-KEY").value();
        userService.validateApiKey(apiKey);

        return diaryService.create(payload);
    }

    @PUT
    @Path("/{id}")
    public DiaryEntry update(long id, @Body DiaryEntryUpdatePayload payload, Request req, Response res) throws Err {
        String apiKey = req.header("X-API-KEY").value();
        userService.validateApiKey(apiKey);

        return diaryService.update(id, payload);
    }

    @GET
    public List<DiaryEntry> getAll(Request req, Response res) throws Err {
        String apiKey = req.header("X-API-KEY").value();
        userService.validateApiKey(apiKey);

        return diaryService.findAll();
    }
}
