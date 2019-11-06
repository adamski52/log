package com.jonathanadamski.diary;

import com.jonathanadamski.diary.model.entity.APIUser;
import com.jonathanadamski.diary.model.entity.DiaryEntry;
import com.jonathanadamski.diary.module.DiaryModule;
import com.jonathanadamski.diary.module.UserModule;
import com.jonathanadamski.diary.operation.DiaryOperation;
import com.jonathanadamski.diary.operation.UserOperation;
import org.jooby.Jooby;
import org.jooby.handlers.CorsHandler;
import org.jooby.hbm.Hbm;
import org.jooby.jdbc.Jdbc;
import org.jooby.json.Jackson;

public class DiaryApplication extends Jooby {
	{
		http2();
		port(3456);

		use("*", new CorsHandler());
		use(new Jackson());
		use(new Jdbc());
		use(new Hbm()
				.classes(DiaryEntry.class, APIUser.class)
		);

		use(new UserModule());
		use(new DiaryModule());

		use(DiaryOperation.class);
		use(UserOperation.class);
	}

	public static void main(String[] args) {
		run(DiaryApplication::new, args);
	}
}
