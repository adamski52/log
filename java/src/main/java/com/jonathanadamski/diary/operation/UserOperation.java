package com.jonathanadamski.diary.operation;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.jonathanadamski.diary.model.entity.APIUser;
import com.jonathanadamski.diary.model.payload.APIUserCreatePayload;
import com.jonathanadamski.diary.service.UserService;
import org.jooby.Err;
import org.jooby.Request;
import org.jooby.Response;
import org.jooby.mvc.*;

@Singleton
@Path("/api/user")
@Produces("application/json")
public class UserOperation {
    private UserService userService;

    @Inject
    public UserOperation(UserService userService) throws Err {
        this.userService = userService;
    }

    @POST
    public APIUser create(@Body APIUserCreatePayload payload, Request req, Response res) throws Err {
        return userService.create(payload);
    }

    @POST
    @Path("/login")
    public APIUser login(@Body APIUserCreatePayload payload, Request req, Response res) throws Err {
        return userService.findOne(payload);
    }
}
