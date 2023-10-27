package com.mindhub.homebanking.utils;

import java.util.regex.Pattern;

public class TransactionUtils {

    private TransactionUtils() {}

    public static boolean regExpAmountValidation(Double input) {
        return Pattern.matches("[0-9]{1,3}(?:,?[0-9]{3})*\\.[0-9]{1,2}", input.toString());
    }
}
