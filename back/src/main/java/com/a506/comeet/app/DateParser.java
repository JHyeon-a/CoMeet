package com.a506.comeet.app;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateParser {

    public static LocalDateTime parse(String string){
        return LocalDateTime.parse(string, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public static String stringParse(LocalDateTime localDateTime){
        return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
