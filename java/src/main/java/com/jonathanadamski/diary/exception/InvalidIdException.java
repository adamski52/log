package com.jonathanadamski.diary.exception;

import org.eclipse.jetty.http.HttpStatus;
import org.jooby.Err;

public class InvalidIdException extends Err {
    public InvalidIdException(long id) {
        super(HttpStatus.BAD_REQUEST_400, "Invalid ID: " + id);
    }
}
