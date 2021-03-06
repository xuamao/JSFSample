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
 * Package type: Service Mock
 * 
 * Date: 13.06.2013
 *
 *****************************************/
package de.heine.cube.onlineMock;

import java.util.HashMap;
import java.util.Map;

import de.heine.cube.common.api.UserService;
import de.heine.cube.common.dto.UserVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.ServiceExceptionType;
import de.heine.cube.common.exception.SystemException;

/**
 * 
 * @author axu
 * 
 */
public class UserServiceMock implements UserService {

	
	private static Map<String, UserVO> map = new HashMap<String, UserVO>();
	
	public UserServiceMock(){
		UserVO user = new UserVO();
	 	user.setUsername("admin");
	 	user.setPassword("admin");
	 	user.setId(1);
	 	user.setFailed_Logins(0);
	 	user.setLocked("false");
	 	
	 	UserVO user2 = new UserVO();
	 	user2.setUsername("amao");
	 	user2.setPassword("admin");
	 	user2.setId(2);
	 	user2.setFailed_Logins(0);
	 	user2.setLocked("true");
	 	
	 	map.put(user.getUsername(), user);
		map.put(user2.getUsername(), user2);
	}

	@Override
	public UserVO createUser(String username, String password, String role,
			int userID) throws ServiceException, SystemException {
		
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.UserService#editUser(java.lang.String, java.lang.String, java.lang.String, int)
	 */
	@Override
	public UserVO editUser(String username, String password, String role,
			int userID) throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.UserService#loginUser(java.lang.String, java.lang.String)
	 */
	@Override
	public UserVO loginUser(String username, String password)
			throws ServiceException, SystemException {
			 
			//To redirect to init Page
		 	if(username.equals("init")){
		 		ServiceException e = new ServiceException("User is locked", ServiceExceptionType.MSG_WARN_INIT_PARAMETER_NOT_SET);
		 		throw e;
		 	}

			if(map.containsKey(username)){
				 	
				 
				 	UserVO user = map.get(username);
				 	if(user.getLocked().equals("true")){
				 		ServiceException e = new ServiceException("User is locked", ServiceExceptionType.MSG_ERROR_VALIDATION_USER_LOCKED);
				 		throw e;
				 	}
				 	
				 	if(!(user.getPassword().equals(password))){
				 		ServiceException e = new ServiceException("Wrong password",  ServiceExceptionType.MSG_ERROR_VALIDATION_PASSWD);
				 		throw e;
				 	}
				 	
				 	return user;
		     }else{
		    	 ServiceException e = new ServiceException("NO User is found",  ServiceExceptionType.MSG_ERROR_DAL_NO_USER_FOUND);
			 	 throw e;
		     }
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.UserService#unlockAccount(java.lang.String, int)
	 */
	@Override
	public UserVO unlockAccount(String username, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
