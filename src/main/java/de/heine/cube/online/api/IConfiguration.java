/***********************************************************
*
*        HEINE Cube-Project
*
***********************************************************
*
* Copyright c 2010 Heine Optotechnik GmbH & Co. KG.
* <info.software@heine.com>  
 *
* @author axu
*
* @brief Header file for Project Cube
*
* @details
* Package type: API It is about the interface of Online-Module
*
*
*/
package de.heine.cube.online.api;

import java.util.Locale;

/**
 * 
 * Configuration is responsible for all configuration information of CUBE-App
 * 
 * 
 * @author xuamao@gmail.com
 * 
 */
public interface IConfiguration {
	
	/**
	 * Language code is defined inside of Locale object. 
	 * Default value is 'en'
	 * 
	 * @return Locale
	 */
	Locale getLocale();
	
	/**
	 * Depending on the Lanuage code, different location string will be returned by this interface
	 * @return
	 */
	String getResourceLocation();
}
