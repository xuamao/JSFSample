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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import de.heine.cube.common.dto.PatientVO;
import de.heine.cube.online.api.IConfiguration;

/**
 * This class is a mock function 
 * 
 * @see IConfiguration
 * @author axu
 * 
 */
public class ConfigurationMock implements IConfiguration {

	public Locale getLocale() {
		return Locale.GERMAN;
	}

	public String getResourceLocation() {
		return "resources/images";
	}

	public List<PatientVO> loadPatientList() {
		List<PatientVO> patientList = new ArrayList<PatientVO>();
		for (int i = 0; i < 10; i++) {
			PatientVO patient = new PatientVO();
			patient.setFirstName("Vorname_" + i);
			patient.setLastName("Nachname_" + i);
			if (i % 2 == 1) {
				patient.setGender("male");
			} else {
				patient.setGender("female");
			}
			patient.setDate_Of_Birth(new Date(1990 + i, i % 12, 10 + i));
			patientList.add(patient);
		}
		return patientList;
	}
}
