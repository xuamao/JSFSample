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
 * Created Date: 10.06.2013
 *
 *****************************************/
package de.heine.cube.online.pagebean;

import java.io.IOException;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.naming.NamingException;

import org.apache.log4j.Logger;
import org.primefaces.context.RequestContext;

import de.heine.cube.common.LanguageDict;
import de.heine.cube.common.api.UserService;
import de.heine.cube.common.dto.UserVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.ServiceExceptionType;
import de.heine.cube.common.exception.SystemException;
import de.heine.cube.online.component.AbstractBean;
import de.heine.cube.online.component.exception.ExceptionHandler;

/**
 * Login Bean
 * This class controls all the login process and actions.
 * 
 * <a href="https://cb.heine.com/cb/issue/6536" target="_blank">SRS 6536</a>
 * 
 * @author axu
 * 
 */
@ManagedBean
@ViewScoped
public class LoginBean extends AbstractBean<UserService> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6855707619823214759L;
	
	private static final Logger log = Logger.getLogger(LoginBean.class.getName());
	
	
	/**
	 * UserService is the ServiceInterface for Login Page
	 */
	public LoginBean(){
		super(UserService.class);
	}
	
	private String username;
	private String password;
	
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username
	 *            the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password
	 *            the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * 
	 * @param actionEvent
	 * @throws NamingException
	 * @throws IOException 
	 */
	public void login(ActionEvent actionEvent) throws NamingException, IOException {  
	        RequestContext requestContext = RequestContext.getCurrentInstance();  
	        FacesMessage msg = null;  
	        boolean loggedIn = false;
	        UserVO user=null;
	        try {
				user = service.loginUser(username, password);
				if(user!=null){
					loggedIn = true;
				}
			} catch (ServiceException e) {
				loggedIn = false;
				
				if(e.getType().equals(ServiceExceptionType.MSG_ERROR_VALIDATION_PASSWD)){
					msg = new FacesMessage(FacesMessage.SEVERITY_WARN, "WARNUNG", message.getString(ServiceExceptionType.MSG_ERROR_VALIDATION_PASSWD)); 
				}else
				if(e.getType().equals(ServiceExceptionType.MSG_ERROR_VALIDATION_USER_LOCKED)){
					msg = new FacesMessage(FacesMessage.SEVERITY_WARN, "WARNUNG", message.getString(ServiceExceptionType.MSG_ERROR_VALIDATION_USER_LOCKED)); 
				}else
				if(e.getType().equals(ServiceExceptionType.MSG_WARN_INIT_PARAMETER_NOT_SET)){
					FacesContext.getCurrentInstance().getExternalContext().redirect("init.xhtml");
					msg = new FacesMessage(FacesMessage.SEVERITY_WARN, "WARNUNG", "INIT"); 
				}else
					if(e.getType().equals(ServiceExceptionType.MSG_ERROR_DAL_NO_USER_FOUND)){
					msg = new FacesMessage(FacesMessage.SEVERITY_WARN, "WARNUNG", "NO "+username+" is found!"); 
				}else{
					e.printStackTrace();
				}
			
			} catch (SystemException e) {
				ExceptionHandler.systemError(e);
			}
	        
	        if(loggedIn) {  
	            String welcome = msgBundle.getString(LanguageDict.LOGIN_MSG_WELCOME);
	            msg = new FacesMessage(FacesMessage.SEVERITY_INFO, welcome, username);  
		        
	            requestContext.addCallbackParam("url", conf.getString("url"));  
		        sessionBean.setLogin(user);
	        } 
	          
	        FacesContext.getCurrentInstance().addMessage(null, msg);  
	        requestContext.addCallbackParam("loggedIn", loggedIn);  
	 }

	
	
}