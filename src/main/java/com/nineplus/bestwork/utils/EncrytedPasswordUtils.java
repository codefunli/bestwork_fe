package com.nineplus.bestwork.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

public class EncrytedPasswordUtils {
	public String encrytePassword(String password) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.encode(password);
	}

	public static void main(String[] args) {
		String password = "123456";
		String encrytedPassword = new EncrytedPasswordUtils().encrytePassword(password);

		System.out.println("Encryted Password: " + encrytedPassword);
		System.out.println(new BCryptPasswordEncoder().matches("123456", encrytedPassword));

//		String key = "companyName";
//		String replaceAll = key.replaceAll("(.)(\\p{Upper})", "$1_$2").toLowerCase();
//
//		System.out.println(replaceAll);

	}

}
