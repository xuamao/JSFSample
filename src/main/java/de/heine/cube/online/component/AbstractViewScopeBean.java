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
 * Package type: General component
 * 
 * Created Date: 29.05.2013
 *
 *****************************************/
package de.heine.cube.online.component;

import java.io.IOException;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import de.heine.cube.common.api.Service;

/**
 * 
 * @author axu
 * 
 */
public abstract class AbstractViewScopeBean<T extends Service> extends AbstractBean<T> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final Logger log = Logger
			.getLogger(AbstractViewScopeBean.class.getName());


	/**
	 * 
	 */
	public AbstractViewScopeBean(Class<T> t) {
		super(t);
		FacesContext context = FacesContext.getCurrentInstance();
		ExternalContext ec = context.getExternalContext();
		HttpSession session = (HttpSession) ec.getSession(false);
		if (session == null || session.getAttribute("username") == null) {
			log.debug("No user is login.");
			try {
				ec.redirect("login.xhtml");
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			if (session.getAttribute("username") != null) {
				log.debug(session.getAttribute("username") + " is login:");
			}
			log.debug("ID:"+session.getId()+" CreateTime:"+session.getCreationTime());
		}

		
	}

}
