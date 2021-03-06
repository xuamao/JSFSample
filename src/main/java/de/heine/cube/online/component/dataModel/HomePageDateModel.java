/***********************************************************
 *
 *        HEINE Cube-Project
 *
 ***********************************************************
 *
 * Copyright c 2010 Heine Optotechnik GmbH & Co. KG.
 * <info.software@heine.com>  
 *
 * @author axu
 *
 * @brief Header file for Project Cube
 *
 * @details
 * Package type: dataModel
 *
 * Date: 01.07.2013
 *
 */
package de.heine.cube.online.component.dataModel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;

import de.heine.cube.common.dto.ImageVO;
import de.heine.cube.common.dto.LocationVO;
import de.heine.cube.common.dto.PatientVO;

/**
 * PageDateModel contains all date for page HomeOverview.xhtml
 * 
 * @author axu
 * 
 */
public class HomePageDateModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3157853141263466381L;

	private static final Logger log = Logger.getLogger(HomePageDateModel.class
			.getName());

	/**
	 * PatientList
	 */
	private String searchKeyword;
	private PatientListDataModel patientListDataModel;
	private List<PatientVO> patientListCache = new ArrayList<PatientVO>();

	/**
	 * Edit Patient
	 */
	private String firstname;
	private String lastname;
	private Date birthday;
	private boolean gender;

	/**
	 * selected Patient
	 */
	private PatientVO selectedPatient;
	private List<LocationVO> locationList;
	private List<ImageVO> imageList;

	private ImageVO image = new ImageVO();

	/**
	 * @return the image
	 */
	public ImageVO getImage() {
		return image;
	}

	/**
	 * @param image
	 *            the image to set
	 */
	public void setImage(ImageVO image) {
		this.image = image;
	}

	/**
	 * @return the patientListCache
	 */
	public List<PatientVO> getPatientListCache() {
		return patientListCache;
	}

	/**
	 * @param patientListCache
	 *            the patientListCache to set
	 */
	public void setPatientListCache(List<PatientVO> patientListCache) {
		this.patientListCache = patientListCache;
	}

	/**
	 * @return the searchKeyword
	 */
	public String getSearchKeyword() {
		return searchKeyword;
	}

	/**
	 * Logic for this function. if the value of search Keyword is changed, it
	 * means the filter should be refreshed. 
	 * 
	 * @param searchKeyword
	 *            the searchKeyword to set
	 */
	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
		log.info("set SearchKeyword:" + searchKeyword);

		List<PatientVO> tempList = new ArrayList<PatientVO>();
		for (PatientVO p : getPatientListCache()) {
			if (p.getFirstName().toLowerCase()
					.contains(searchKeyword.toLowerCase())
					|| p.getLastName().toLowerCase()
							.contains(searchKeyword.toLowerCase())) {
				tempList.add(p);
			}
		}
		patientListDataModel = new PatientListDataModel(tempList);
	}

	/**
	 * @return the selectedPatient
	 */
	public PatientVO getSelectedPatient() {
		return selectedPatient;
	}

	/**
	 * @param selectedPatient
	 *            the selectedPatient to set
	 */
	public void setSelectedPatient(PatientVO selectedPatient) {
		this.selectedPatient = selectedPatient;
	}

	/**
	 * @return the firstname
	 */
	public String getFirstname() {
		return firstname;
	}

	/**
	 * @param firstname
	 *            the firstname to set
	 */
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	/**
	 * @return the lastname
	 */
	public String getLastname() {
		return lastname;
	}

	/**
	 * @param lastname
	 *            the lastname to set
	 */
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	/**
	 * @return the birthday
	 */
	public Date getBirthday() {
		return birthday;
	}

	/**
	 * @param birthday
	 *            the birthday to set
	 */
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	/**
	 * @return the gender
	 */
	public boolean isGender() {
		return gender;
	}

	/**
	 * @param gender
	 *            the gender to set
	 */
	public void setGender(boolean gender) {
		this.gender = gender;
	}

	/**
	 * @return the patientListDataModel
	 */
	public PatientListDataModel getPatientDataModel() {
		return patientListDataModel;
	}

	/**
	 * @param patientListDataModel
	 *            the patientListDataModel to set
	 */
	public void setPatientDataModel(PatientListDataModel patientListDataModel) {
		this.patientListDataModel = patientListDataModel;
	}

	/**
	 * @return the locationList
	 */
	public List<LocationVO> getLocationList() {
		return locationList;
	}

	/**
	 * @param locationList
	 *            the locationList to set
	 */
	public void setLocationList(List<LocationVO> locationList) {
		this.locationList = locationList;
	}

	/**
	 * @return the imageList
	 */
	public List<ImageVO> getImageList() {
		return imageList;
	}

	/**
	 * @param imageList
	 *            the imageList to set
	 */
	public void setImageList(List<ImageVO> imageList) {
		this.imageList = imageList;
	}

}