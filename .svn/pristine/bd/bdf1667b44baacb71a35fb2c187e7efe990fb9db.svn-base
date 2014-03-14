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
package de.heine.cube.online.component;

import java.util.HashMap;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.apache.log4j.Logger;

import de.heine.cube.common.api.LocationService;
import de.heine.cube.common.api.PatientService;
import de.heine.cube.common.api.Service;
import de.heine.cube.common.api.SettingService;
import de.heine.cube.common.api.UserService;
import de.heine.cube.online.component.exception.ExceptionHandler;
import de.heine.cube.onlineMock.LocationServiceMock;
import de.heine.cube.onlineMock.PatientServiceMock;
import de.heine.cube.onlineMock.SettingServiceMock;
import de.heine.cube.onlineMock.UserServiceMock;

/**
 * 
 * @author axu
 * 
 */
public class ConnectionService {
	
	private static final Logger log = Logger.getLogger(ConnectionService.class.getName());
	
	private static Map<String, Object> map= new HashMap<String, Object>();
	
	/**
	 * Add all mock class in Map
	 */
	static {
		map.put(UserService.class.getSimpleName(), new UserServiceMock());
		map.put(PatientService.class.getSimpleName(), new PatientServiceMock());
		map.put(SettingService.class.getSimpleName(), new SettingServiceMock());
		map.put(LocationService.class.getSimpleName(), new LocationServiceMock());
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends Service> T getService(Class<T> serviceAPI) {
		Context ctx;
		T remote=null;
		try {
			ctx = new InitialContext();
			String name = getlookupName(serviceAPI);
			remote = (T) ctx.lookup(name);
			log.info(serviceAPI.getName());
		} catch (NamingException e) {
			
			/**
			 * This code provide a function,
			 * If server is not deployed, online module can use Mock-class 
			 * to test web function.
			 * 
			 * It must be removed after test phase.
			 * 
			 */
			//remote = (T) map.get(serviceAPI.getSimpleName());
			log.error("NamingException: can not find service "+serviceAPI.getSimpleName()+" in Server!");
			ExceptionHandler.systemError(e);
		}
		return remote;

	}
	
	
	private static String getlookupName(Class<?> api){
		return "java:global/CUBE-Web-Processor/"+api.getSimpleName()+"Bean";
	}
}
