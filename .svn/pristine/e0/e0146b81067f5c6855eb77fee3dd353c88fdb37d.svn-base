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
 * Date: 17.06.2013
 *
 *****************************************/
package de.heine.cube.online.pagebean;

import java.io.IOException;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

import org.apache.log4j.Logger;

import de.heine.cube.common.api.SettingService;
import de.heine.cube.online.component.AbstractBean;

/**
 * 
 * @author axu
 * 
 */
@ManagedBean
@RequestScoped
public class AdministratorBean extends AbstractBean<SettingService> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2012200635919519763L;
	
	private static final Logger log = Logger.getLogger(AdministratorBean.class.getName());
	
	private String password;
	
	/**
	 * 
	 */
	public AdministratorBean() {
		super(SettingService.class);
	}
	
	/**
	 * check whether the administrator password is correct.
	 */
	public void checkPassword(){
		
		//if(password!=service.getValue("AdministratorPassword")){
		if(password.equals("Admin")){
			log.info("administrator is correct");
			FacesContext context = FacesContext.getCurrentInstance();
			ExternalContext ec = context.getExternalContext();
			try {
				ec.redirect("setting.xhtml");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else{
			//TODO:
			// set Message
			log.info("administrator is false");
		}
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
