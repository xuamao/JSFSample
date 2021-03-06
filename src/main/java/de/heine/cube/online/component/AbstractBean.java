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
 * Date: 29.05.2013
 *
 *****************************************/
package de.heine.cube.online.component;

import java.io.Serializable;
import java.util.ResourceBundle;

import javax.faces.bean.ManagedProperty;
import javax.faces.context.FacesContext;

import de.heine.cube.common.api.Service;
import de.heine.cube.common.exception.Messages;
import de.heine.cube.online.api.IConfiguration;
import de.heine.cube.online.sessionbean.SessionScopeBean;
import de.heine.cube.onlineMock.ConfigurationMock;

/**
 * 
 * @author axu
 * 
 */
public abstract class AbstractBean<T extends Service> implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 530863901680518185L;
	
	protected IConfiguration cubeConfig = new ConfigurationMock();
	
	protected ResourceBundle msgBundle;

	protected ResourceBundle conf;
	
	protected Messages message = new Messages(cubeConfig.getLocale());
	
	protected FacesContext context = FacesContext.getCurrentInstance();
	
	protected T service;
	
	@ManagedProperty(value="#{sessionBean}")
	protected SessionScopeBean sessionBean;
	

	/**
	 * get function for @ManagedProperty
	 * 
	 * @return the sessionBean
	 */
	public SessionScopeBean getSessionBean() {
		return sessionBean;
	}

	/**
	 * set function for @ManagedProperty
	 * 
	 * @param sessionBean the sessionBean to set
	 */
	public void setSessionBean(SessionScopeBean sessionBean) {
		this.sessionBean = sessionBean;
	}
	
	/**
	 * Constructor function
	 * Two resource bundle need to be loaded by constructor function.
	 * 
	 */
	public AbstractBean(Class<T> t){
			// see faces-config.xml
			msgBundle = context.getApplication().getResourceBundle(context, "msg");
			conf = context.getApplication().getResourceBundle(context, "conf");
			service = (T) ConnectionService.getService(t);
			sessionBean = new SessionScopeBean();
	}
	
	/**
	 * Constructor function
	 * Two resource bundle need to be loaded by constructor function.
	 * 
	 */
	public AbstractBean(){
			/**
			 * msgBundle is initialized in AbstractBean.java
			 */
			msgBundle = context.getApplication().getResourceBundle(context, "msg");
			conf = context.getApplication().getResourceBundle(context, "conf");
	}
	
	public T getservice()
	{
		return  service;
	}
}
