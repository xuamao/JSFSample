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

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;

import org.apache.log4j.Logger;

import de.heine.cube.common.SettingKeyDict;
import de.heine.cube.common.api.SettingService;
import de.heine.cube.common.dto.SettingVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.SystemException;
import de.heine.cube.online.component.AbstractBean;
import de.heine.cube.online.component.dataModel.SettingDateModel;

/**
 * Login Bean
 * 
 * @author ALTRAN
 * 
 */
@ManagedBean
@ViewScoped
public class InitBean extends AbstractBean<SettingService> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6855707619823214759L;
	
	private static final Logger log = Logger.getLogger(InitBean.class.getName());
	
	private SettingDateModel datamodel = new SettingDateModel();
	
	/**
	 * UserService is the ServiceInterface for Login Page
	 */
	public InitBean(){
		super(SettingService.class);
	}

	/**
	 * @return the datamodel
	 */
	public SettingDateModel getDatamodel() {
		return datamodel;
	}

	/**
	 * @param datamodel the datamodel to set
	 */
	public void setDatamodel(SettingDateModel datamodel) {
		this.datamodel = datamodel;
	}
	
	/**
	 * set all the necessary setting values, before the first Login for Cube App
	 * 
	 * @param actionEvent
	 */
	public void save(ActionEvent actionEvent) { 
		log.info(datamodel.toString());
		
		try {
			SettingVO[] settingList = new SettingVO[9];
			
			SettingVO networkname = new SettingVO();
			networkname.setName(SettingKeyDict.SETTING_KEY_CUBE_NETWORK_NAME);
			networkname.setValue(datamodel.getCubeNetworkName());
			settingList[0] = networkname;
			
			SettingVO dataformat = new SettingVO();
			dataformat.setName(SettingKeyDict.SETTING_KEY_DATEFORMAT);
			dataformat.setValue(datamodel.getDateFormat());
			settingList[1] = dataformat;
			
			SettingVO language = new SettingVO();
			language.setName(SettingKeyDict.SETTING_KEY_LANGUAGE);
			language.setValue(datamodel.getLanguage());
			settingList[2] = language;
			
			SettingVO measurement = new SettingVO();
			measurement.setName(SettingKeyDict.SETTING_KEY_MEASUREMENT_UNIT);
			measurement.setValue(datamodel.getMeasurementUnit());
			settingList[3] = measurement;
			
			SettingVO officeaddress = new SettingVO();
			officeaddress.setName(SettingKeyDict.SETTING_KEY_OFFICE_ADDRESS);
			officeaddress.setValue(datamodel.getDoctorOfficeAdress());
			settingList[4] = officeaddress;
			
			SettingVO officeemail = new SettingVO();
			officeemail.setName(SettingKeyDict.SETTING_KEY_OFFICE_EMAIL);
			officeemail.setValue(datamodel.getDoctorOfficeEmail());
			settingList[5] = officeemail;
			
			SettingVO officename = new SettingVO();
			officename.setName(SettingKeyDict.SETTING_KEY_OFFICE_NAME);
			officename.setValue(datamodel.getDoctorOfficeName());
			settingList[6] = officename;
			
			SettingVO officestreet = new SettingVO();
			officestreet.setName(SettingKeyDict.SETTING_KEY_OFFICE_STREET);
			officestreet.setValue(datamodel.getDoctorOfficeStreet());
			settingList[7] = officestreet;
			
			SettingVO officetel = new SettingVO();
			officetel.setName(SettingKeyDict.SETTING_KEY_OFFICE_TEL);
			officetel.setValue(datamodel.getDoctorOfficeTel());
			settingList[8] = officetel;
			service.createSettings(settingList, 0);
			
			FacesContext.getCurrentInstance().getExternalContext().redirect("login.xhtml");
			
		} catch (ServiceException se) {
			//TODO: ServiceException should be deal with
			se.printStackTrace();
		} catch (SystemException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
}