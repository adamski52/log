package com.jonathanadamski.diary.module;

import com.google.inject.Binder;
import com.jonathanadamski.diary.service.UserService;
import com.typesafe.config.Config;
import org.jooby.Env;
import org.jooby.Jooby;

public class UserModule implements Jooby.Module {
    @Override
    public void configure(Env env, Config conf, Binder binder) {
        UserService userService = new UserService();
        String salt = conf.getString("app.salt");
        userService.setSalt(salt);
        env.set(UserService.class, userService);
        binder.bind(UserService.class).toInstance(userService);
    }
}
