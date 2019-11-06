package com.jonathanadamski.diary.module;

import com.google.inject.Binder;
import com.jonathanadamski.diary.service.DiaryService;
import com.typesafe.config.Config;
import org.jooby.Env;
import org.jooby.Jooby;

public class DiaryModule implements Jooby.Module {
    @Override
    public void configure(Env env, Config conf, Binder binder) {
        DiaryService diaryService = new DiaryService();
        env.set(DiaryService.class, diaryService);
        binder.bind(DiaryService.class).toInstance(diaryService);
    }
}
