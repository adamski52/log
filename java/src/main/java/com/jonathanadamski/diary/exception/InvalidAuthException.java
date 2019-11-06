package com.jonathanadamski.diary.exception;

import org.eclipse.jetty.http.HttpStatus;
import org.jooby.Err;

public class InvalidAuthException extends Err {
    public InvalidAuthException() {
        super(HttpStatus.UNAUTHORIZED_401, "Invalid username/password");
    }
}
