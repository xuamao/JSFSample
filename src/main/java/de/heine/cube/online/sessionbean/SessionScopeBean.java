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
package de.heine.cube.online.sessionbean;

import java.io.Serializable;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import de.heine.cube.common.api.LocationService;
import de.heine.cube.common.dto.LocationVO;
import de.heine.cube.common.dto.PatientVO;
import de.heine.cube.common.dto.UserVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.SystemException;
import de.heine.cube.online.component.ConnectionService;

/**
 * 
 * 
 * @author axu
 * 
 */
@ManagedBean(name = "sessionBean", eager = true)
@SessionScoped
public class SessionScopeBean implements Serializable {

	private static final Logger log = Logger.getLogger(SessionScopeBean.class
			.getName());

	private LocationService locationService;

	/**
	 * 
	 */
	private static final long serialVersionUID = -3725974060965998866L;

	public SessionScopeBean() {
		log.info("SessionBean initialized");
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(true);
		log.debug("SessionID:" + session.getId());
		locationService = ConnectionService.getService(LocationService.class);
	}

	public void setLogin(UserVO username) {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		session.setAttribute("username", username);
		log.info("User:" + username + " is currently loggedin.");
	}

	public UserVO getLogin() {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		UserVO user = (UserVO) session.getAttribute("username");
		log.info("Login User Information: " + user.toString());
		return user;
	}

	public void setLogout() {
		log.info("session is removed");
		FacesContext.getCurrentInstance().getExternalContext()
				.invalidateSession();
	}

	public void setCurrentPatient(PatientVO patientVO) {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		session.setAttribute("patientVO", patientVO);
	}
	
	public void removeCurrentPatient(){
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		session.removeAttribute("patientVO");
	}

	public PatientVO getCurrentPatient() {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		return (PatientVO) session.getAttribute("patientVO");
	}

	/**
	 * Return JSON-notation of all Locations of the current user
	 * 
	 * @return JSON-notation or empty array ("[]") if anything goes wrong or is
	 *         null
	 */
	public String getLocationsOfCurrentPatientAsJSON() {
		HttpSession session = (HttpSession) FacesContext.getCurrentInstance()
				.getExternalContext().getSession(false);
		if (session == null) {
			log.warn("Session == null empty array of locations will be returned");
			return "[]";
		}
		PatientVO patient = (PatientVO) session.getAttribute("patientVO");
		int patientID;
		if (patient == null) {
			log.warn("Patient == null using Dummy PatientID=1");
			patientID = 1;
		}
		else {
			patientID = patient.getID_Patient();
		}
		try {
			// TODO dubuglevel anpassen
			log.info("using locationService: " + locationService.getClass().getCanonicalName());
			List<LocationVO> locs = locationService
					.getAllLocationsForPatient(patientID);
			StringBuffer json = new StringBuffer("[");
			boolean first = true;
			if (locs != null) {
				// TODO loglevel anpassen
				log.info("LocationService returned " + locs.size() + " Locations for PatientID=" + patientID);
				for (LocationVO loc : locs) {
					if (!first) {
						json.append(", ");
					}
					json.append(locToJSON(loc));
					first = false;
				}
			}
			else {
				log.info("LocationService returned null");
			}
			json.append("]");
			return json.toString();

		} catch (ServiceException e) {
			// FIXME Exceptionhandling fehlt noch
			e.printStackTrace();
			return "[]";
		} catch (SystemException e) {
			// FIXME Exceptionhandling fehlt noch
			e.printStackTrace();
			return "[]";
		}
	}

	/**
	 * Converting LocationVO into JSON-notation
	 * 
	 * @param loc
	 * @return LocationVO as JSON or "null" if loc == null
	 */
	protected String locToJSON(LocationVO loc) {
		if (loc != null) {
			return "{ \"x\":" + loc.getX_Coordinate() + ", \"y\":"
					+ loc.getY_Coordinate() + ", \"facing\":\"" + String.valueOf(loc.getFacing()) + "\" }";
		} else {
			return "null";
		}

	}

	public String locArrayToJSON(LocationVO[] locs) {
		StringBuffer json = new StringBuffer("[");
		boolean first = true;
		if (locs != null) {
			for (LocationVO loc : locs) {
				if (!first) {
					json.append(", ");
				}
				json.append(locToJSON(loc));
				first = false;
			}
		}
		json.append("]");
		return json.toString();
	}

}
