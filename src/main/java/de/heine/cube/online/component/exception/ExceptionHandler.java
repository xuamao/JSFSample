/***********************************************************
 *
 *        HEINE Cube-Project
 *
 ***********************************************************
 *
 * Copyright c 2010 Heine Optotechnik GmbH & Co. KG.
 * <info.software@heine.com>  
 *
 * @author axu <amao.xu@altran.com>
 *
 * @brief Header file for Project Cube
 *
 * @details
 * Package type: ExceptionHandler
 *
 * Date: 01.07.2013
 *
 *****************************************/
package de.heine.cube.online.component.exception;

import java.io.IOException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

/**
 * Simple entry point for Exceptions
 * ExceptionHandler implement static methods to deal with different type of Exception
 * 
 * @author axu
 * 
 */
public class ExceptionHandler {
	
	/**
	 * 
	 * @param e
	 */
	public static void systemError(Exception e){
		try {
			ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
			context.invalidateSession();
			context.redirect("Exception.xhtml");
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}
	
	/**
	 * set the message for service Exception and set return type
	 */
	public static void serviceError(Exception e){
		//TODO:
		
	}
}
