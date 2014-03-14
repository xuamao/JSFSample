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
 * Package type: Language Loader
 *
 * Date: 29.05.2013
 *
 *****************************************/
package de.heine.cube.online.component.language;

import java.util.Locale;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import org.apache.log4j.Logger;

import de.heine.cube.online.component.AbstractBean;

/**
 * LanguageLoader initize and reload the language configuration for CUBE-APP
 * 
 * @author axu
 * 
 */
@ManagedBean(name = "languageLoader")
@SessionScoped
public class LanguageLoader extends AbstractBean{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4296010700835051064L;
	private static final Logger log = Logger.getLogger(LanguageLoader.class
			.getName());

	/**
	 * LanguageLoader is initialized, before any page is started.
	 */
	public LanguageLoader() {
	}

	/**
	 * @return the local
	 */
	public Locale getLocal() {
		return cubeConfig.getLocale();
	}


}
