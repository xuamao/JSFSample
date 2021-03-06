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

import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import de.heine.cube.common.api.PatientService;
import de.heine.cube.common.dto.ImageVO;
import de.heine.cube.common.dto.PatientVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.ServiceExceptionType;
import de.heine.cube.common.exception.SystemException;

/**
 * This class is a mock function for PatientService
 * @author axu
 * 
 */
public class PatientServiceMock implements PatientService {

	private List<PatientVO> patientList = new ArrayList<PatientVO>();
	
	/**
	 * 
	 */
	public PatientServiceMock(){
		Date date=new Date() ;
		SimpleDateFormat sdf =  new SimpleDateFormat("yyyy, MM, dd");
        try {
			date = sdf.parse("2009, 12, 9");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
		PatientVO patient = new PatientVO();
		patient.setID_Patient(1);
		patient.setFirstName("Amao" );
		patient.setLastName("Xu");
		patient.setGender("male");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(2);
		patient.setFirstName("Markus" );
		patient.setLastName("Prison");
		patient.setGender("male");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(3);
		patient.setFirstName("Yifan" );
		patient.setLastName("Tan");
		patient.setGender("female");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(4);
		patient.setFirstName("Steven" );
		patient.setLastName("Bailey");
		patient.setGender("male");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(5);
		patient.setFirstName("Thomas" );
		patient.setLastName("Hadamitzky");
		patient.setGender("male");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(6);
		patient.setFirstName("Andreas" );
		patient.setLastName("Koenig");
		patient.setGender("male");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(7);
		patient.setFirstName("Dimitar" );
		patient.setLastName("Zlatkov");
		patient.setGender("male");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		patient = new PatientVO();
		patient.setID_Patient(8);
		patient.setFirstName("Bita" );
		patient.setLastName("Motamedian");
		patient.setGender("female");
		patient.setDate_Of_Birth(date);
		patientList.add(patient);
		
		for(int i=0;i<3;i++){
			patient = new PatientVO();
			patient.setID_Patient(9+i);
			patient.setFirstName("Master"+i );
			patient.setLastName("Mustermann"+i);
			patient.setGender("female");
			patient.setDate_Of_Birth(date);
			patientList.add(patient);
		}
	}
	
	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#createPatient(java.lang.String, java.lang.String, java.util.Date, java.lang.String)
	 */
	@Override
	public PatientVO createPatient(String name, String firstName,
			Date date_Of_Birth, String gender) throws ServiceException,
			SystemException {
		for(PatientVO pa: patientList){
			if(pa.getFirstName().equals(firstName)&&pa.getLastName().equals(name)){
				throw new ServiceException(ServiceExceptionType.MSG_ERROR_VALIDATION_PATIENT_EXISTS);
			}
		}
		PatientVO p = new PatientVO();
		p.setID_Patient(patientList.size());
		p.setFirstName(firstName);
		p.setLastName(name);
		p.setDate_Of_Birth(date_Of_Birth);
		p.setGender(gender);
		patientList.add(p);
		
		return p;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#getPatients()
	 */
	@Override
	public List<PatientVO> getPatients() {
		return patientList;
	}


	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#getPatient(java.lang.String, java.lang.String, java.util.Date)
	 */
	@Override
	public List<PatientVO> getPatient(String Comment, String Diagnosis,
			Date Date_Of_Birth) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#exportSinglePatient(java.util.List)
	 */
	@Override
	public String exportSinglePatient(List<Integer> patientID) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#exportImage(de.heine.cube.common.dto.ImageVO[])
	 */
	@Override
	public byte[] exportImage(ImageVO[] image) {
		// TODO Auto-generated method stub
		return null;
	}


	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#importPatient(java.lang.String, java.lang.String)
	 */
	@Override
	public String importPatient(String Name, String firstName) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#restorePatient(java.lang.String, java.lang.String)
	 */
	@Override
	public String restorePatient(String Name, String firstName) {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#getPatient(java.lang.String, java.lang.String, java.lang.String, java.util.Date)
	 */
	@Override
	public PatientVO getPatient(String Name, String firstName, String gender,
			Date Date) throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#getPatient(int)
	 */
	@Override
	public PatientVO getPatient(int patientID) throws ServiceException,
			SystemException {
		for(PatientVO p: patientList){
			if(p.getID_Patient()==patientID)
				return p;
		}
		
		throw new ServiceException("Test");
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#deletePatient(int, int)
	 */
	@Override
	public PatientVO deletePatient(int patientID, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		for(PatientVO pa: patientList){
			if(pa.getID_Patient() == patientID){
				patientList.remove(pa);
				return pa;
			}
		}
		
		return null;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#editPatient(de.heine.cube.common.dto.PatientVO, int)
	 */
	@Override
	public PatientVO editPatient(PatientVO patient, int userID)
			throws ServiceException, SystemException {
		return patient;
	}

	/* (non-Javadoc)
	 * @see de.heine.cube.common.api.PatientService#exportPDF(de.heine.cube.common.dto.ImageVO[])
	 */
	@Override
	public String exportPDF(ImageVO[] images) throws ServiceException,
			SystemException {
		int i = 10;
		i++;
		return "";
	}


}
