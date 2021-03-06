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

import java.util.List;

import de.heine.cube.common.api.SettingService;
import de.heine.cube.common.dto.SettingVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.SystemException;

/**
 * 
 * @author axu
 * 
 */
public class SettingServiceMock implements SettingService {

	
	
	public SettingServiceMock(){
		
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.SettingService#getValue(java.lang.String)
	 */
	@Override
	public SettingVO getValue(String name) throws ServiceException,
			SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.SettingService#setValue(java.lang.String, java.lang.String)
	 */
	@Override
	public SettingVO setValue(String name, String value)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.SettingService#createSetting(java.lang.String, java.lang.String, int)
	 */
	@Override
	public SettingVO createSetting(String name, String value, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SettingVO> createSettings(SettingVO[] setting, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	

}
