package com.jonathanadamski.diary.exception;

import org.eclipse.jetty.http.HttpStatus;
import org.jooby.Err;

public class InvalidAPIKeyException extends Err {
    public InvalidAPIKeyException() {
        super(HttpStatus.UNAUTHORIZED_401, "Invalid API Key");
    }
}
