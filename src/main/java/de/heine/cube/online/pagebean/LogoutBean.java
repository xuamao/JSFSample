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
 * Created Date: 17.06.2013
 *
 *****************************************/
package de.heine.cube.online.pagebean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

import org.apache.log4j.Logger;

import de.heine.cube.common.api.UserService;
import de.heine.cube.online.component.AbstractViewScopeBean;

/**
 * 
 * @author axu
 * 
 */
@ManagedBean
@RequestScoped
public class LogoutBean extends AbstractViewScopeBean<UserService> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2012200635919519763L;
	
	private static final Logger log = Logger.getLogger(LogoutBean.class.getName());
	
	/**
	 * 
	 */
	public LogoutBean() {
		super(UserService.class);
	}

	public String logout(){
		getSessionBean().setLogout();
		log.info("logout");
		return "logout";
	}

}
