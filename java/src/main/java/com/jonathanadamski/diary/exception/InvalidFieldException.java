package com.jonathanadamski.diary.exception;

import org.eclipse.jetty.http.HttpStatus;
import org.jooby.Err;

public class InvalidFieldException extends Err {
    public InvalidFieldException(String field, String value) {
        super(HttpStatus.BAD_REQUEST_400, "Invalid field (" + field + "): " + value);
    }
}
