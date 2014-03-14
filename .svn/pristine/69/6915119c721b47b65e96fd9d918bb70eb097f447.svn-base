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
 * Package type: Session Beans
 * 
 * Created Date: 29.05.2013
 *
 *****************************************/
package de.heine.cube.online.sessionbean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import org.apache.log4j.Logger;

import de.heine.cube.online.component.AbstractBean;

/**
 * Resource allocation 
 * For different language, different resource locations are required. 
 * This bean is responsible to deal with the resource location by using setting configuration information.
 * 
 * @author axu
 *
 */
@ManagedBean(name="resourcen")
@SessionScoped
public class ResourceLocationBean extends AbstractBean{
	

	private static final Logger log = Logger.getLogger(ResourceLocationBean.class.getName());
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1278246487822560884L;

	
	public String getImageLocation(){
		return cubeConfig.getResourceLocation();
	}
	
	public void setImageLocation(String imageLocation){
		
	}
}
