package com.jonathanadamski.diary.exception;

import org.eclipse.jetty.http.HttpStatus;
import org.jooby.Err;

public class ServerException extends Err {
    public ServerException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR_500, "Server Error");
    }
}
