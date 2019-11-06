package com.jonathanadamski.diary.exception;

import org.eclipse.jetty.http.HttpStatus;
import org.jooby.Err;

public class NotFoundException extends Err {
    public NotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND_404, "DiaryEntry not found for id: " + id);
    }
}
