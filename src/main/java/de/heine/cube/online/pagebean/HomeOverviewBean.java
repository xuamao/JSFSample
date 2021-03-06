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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.event.ValueChangeEvent;

import org.apache.log4j.Logger;
import org.primefaces.context.RequestContext;
import org.primefaces.event.SelectEvent;
import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;

import de.heine.cube.common.Gender;
import de.heine.cube.common.LanguageDict;
import de.heine.cube.common.api.LocationService;
import de.heine.cube.common.api.PatientService;
import de.heine.cube.common.dto.ImageVO;
import de.heine.cube.common.dto.LocationVO;
import de.heine.cube.common.dto.PatientVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.ServiceExceptionType;
import de.heine.cube.common.exception.SystemException;
import de.heine.cube.online.component.AbstractViewScopeBean;
import de.heine.cube.online.component.ConnectionService;
import de.heine.cube.online.component.dataModel.HomePageDateModel;
import de.heine.cube.online.component.dataModel.PatientListDataModel;

/**
 * HomeOverviewBean
 * 
 *  <a href="https://cb.heine.com/cb/issue/6478"  target="_blank">SRS 6478</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6567"  target="_blank">SRS 6567</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6541"  target="_blank">SRS 6541</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6565"  target="_blank">SRS 6565</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6566"  target="_blank">SRS 6566</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6477"  target="_blank">SRS 6477</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6580"  target="_blank">SRS 6580</a><br/>
 *  <a href="https://cb.heine.com/cb/issue/6581"  target="_blank">SRS 6581</a><br/>
 *   
 * @author axu
 * 
 */
@ManagedBean
@ViewScoped
public class HomeOverviewBean extends AbstractViewScopeBean<PatientService> {

	public final String DUMMY_IMAGE_URL = "resources/images/imageThumbnailNormal.png";
	
	public final String MIME_TYPE_PDF = "application/pdf";
	public final String MIME_TYPE_ZIP = "application/zip";
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6855707619823214759L;
	
	private static final Logger log = Logger.getLogger(HomeOverviewBean.class
			.getName());

	private HomePageDateModel dataModel = new HomePageDateModel();
	
	private LocationService locationService;
	
	/**
	 * 
	 * HomeOverviewBean is responsible for two different scenarios.
	 * The Constructor function controls, whether a current patient is ready chosen and saved in session.
	 * 
	 * Scenario ONE:
	 * If a patient is already given, then the Constructor function try to load the location list and image list according to the patientID.
	 * @see HomePageDateModel.locationList  && HomePageDateModel.imageList
	 * 
	 * Steps:
	 * 1.) initialize LocationService
	 * 2.) control current patient
	 * 3.) load LocationList according to ID of current patient
	 * 4.) load ImageList according to IDs of locationList
	 * 3.) set data 
	 * 
	 * Scenario Two:
	 *  The Constructor function try to load the patient list and save the patient list in cache list.
	 * This Scenario will be always executed.
	 * @see HomePageDateModel.patientList
	 * 
	 * Steps:
	 * 1.) initialize Service
	 * 2.) load Patient list using service
	 * 3.) set data
	 * 
	 */
	public HomeOverviewBean() {
		super(PatientService.class);
		locationService = ConnectionService.getService(LocationService.class);
		log.debug("load Patient list");
		PatientVO currentPatient= sessionBean.getCurrentPatient();
		List<ImageVO> imageList = new ArrayList<ImageVO>();
		List<LocationVO> locList = new ArrayList<LocationVO>();
		try {
			if(currentPatient!=null){	
				
				dataModel.setSelectedPatient(currentPatient);
				locationService = ConnectionService.getService(LocationService.class);
				
				locList = locationService.getAllLocationsForPatient(currentPatient.getID_Patient());
				
				
				for(LocationVO location : locList){
					List<ImageVO> temList = locationService.getLocationImages(location);
					imageList.addAll(temList);
				}
			}
			List<PatientVO> patientDateModel = service.getPatients();
			dataModel.setPatientListCache(patientDateModel);
			dataModel.setPatientDataModel(new PatientListDataModel(patientDateModel));
			
		} catch (ServiceException e2) {
			e2.printStackTrace();
		} catch ( SystemException e){
			e.printStackTrace();
		}
		if (locList != null && locList.size() > 0){
			dataModel.setLocationList(locList);
		}
		if(imageList.size() < 12){
			int size = imageList.size();
			for(int i = size; i < 12; i++){
				ImageVO dummy = new ImageVO();
				dummy.setImage(DUMMY_IMAGE_URL);
				imageList.add(dummy);
			}
		}
		dataModel.setImageList(imageList);
	}
	
	/**
	 * selected Patient for cube APP
	 * 
	 * @return 
	 */
	public PatientVO getCurrentPatient(){
		PatientVO p=sessionBean.getCurrentPatient();
		// If the patient is not set, a new instance should be created to avoid the NullpointException
		if(p==null){
			p=new PatientVO();
			p.setFirstName("Firstname");
			p.setLastName("Lastname");
			p.setGender("Male");
			p.setDate_Of_Birth(new Date());
		}
		return p;
	}
	
	/**
	 * @return the dataModel
	 */
	public HomePageDateModel getDataModel() {
		return dataModel;
	}

	/**
	 * @param dataModel the dataModel to set
	 */
	public void setDataModel(HomePageDateModel dataModel) {
		this.dataModel = dataModel;
	}

	/**
	 * 
	 * If the search key word is changed, patientlist should be reloaded.
	 * 
	 * @param e Event
	 */
	public void reloadPatient(ValueChangeEvent e) {
		log.info("Reload Patient");
		log.info("New Value" + e.getNewValue());
	}

	/**
	 * 1.) chosen a patient for currect work flow
	 * 2.) set the patient in session
	 * 
	 * @param event
	 * @throws IOException
	 */
	public void onRowSelect(SelectEvent event) throws IOException {
		PatientVO selectedPatient = (PatientVO)event.getObject();
		
		sessionBean.setCurrentPatient(selectedPatient);
		FacesMessage msg = new FacesMessage("Patient Selected", event.getObject()
				.toString());
		
		log.info("Selected Patient Info: "+selectedPatient.toString());
		FacesContext.getCurrentInstance().addMessage(null, msg);
		FacesContext.getCurrentInstance().getExternalContext().redirect("homeOverview.xhtml");
	}
	
	/**
	 * 1.)save the patient in server
	 * 2.)set the patient in sessionBean
	 * 
	 * @param actionEvent
	 */
	public void saveandstart(ActionEvent actionEvent){
		log.info("Action: Save and Start");
		RequestContext context = RequestContext.getCurrentInstance(); 
		try {
			PatientVO patient = savePatient();
			sessionBean.setCurrentPatient(patient);
			
			context.addCallbackParam("url", "baseline.xhtml?patientID="+patient.getID_Patient());  
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String lastname=dataModel.getLastname();
		String firstname = dataModel.getFirstname();
		boolean gender = dataModel.isGender();
		Date birthday = dataModel.getBirthday();
		
		String message = "Patient: ";
		if(lastname.equals(null)&&firstname.equals(null)&&birthday.equals(null)){
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Empty value","");  
			FacesContext.getCurrentInstance().addMessage(null, msg); 
			message ="Empty Value";
		}
		 
		context.addCallbackParam("message", message);
		
	}
	
	/**
	 * 
	 * @param actionEvent 
	 */
	public void saveandnew(ActionEvent actionEvent){
		log.info("Action: Save and new");
		RequestContext context = RequestContext.getCurrentInstance();
		FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "", "");  
		
		try {
			 savePatient();
		} catch (ServiceException e) {
			if(e.getType().equals(ServiceExceptionType.MSG_ERROR_VALIDATION_PATIENT_EXISTS)){
				msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "ERROR", message.getString(ServiceExceptionType.MSG_ERROR_VALIDATION_PATIENT_EXISTS));  
				FacesContext.getCurrentInstance().addMessage(null, msg); 
			}
			return;
			
		} catch (SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		dataModel.setLastname(null);
		dataModel.setFirstname(null);
		dataModel.setGender(true);
		dataModel.setBirthday(null);
		
		msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "INFO", msgBundle.getString(LanguageDict.MSG_INFO_PATIENTADDSUCCESS));  
		FacesContext.getCurrentInstance().addMessage(null, msg); 
	}
	
	/**
	 * 
	 * @return saved PatientVO object
	 * @throws ServiceException
	 * @throws SystemException
	 * @see PatientVO
	 * 
	 */
	private PatientVO savePatient() throws ServiceException, SystemException{
		
		String lastname=dataModel.getLastname();
		String firstname = dataModel.getFirstname();
		boolean gender = dataModel.isGender();
		Date birthday = dataModel.getBirthday();
		return service.createPatient(lastname, firstname, birthday ,  Gender.get( gender ? 1 : 0 ).toString());
	}
	
	/**
	 * 
	 * @param actionEvent
	 */
	public void saveCurrentPatient(ActionEvent actionEvent){
		sessionBean.setCurrentPatient(getDataModel().getSelectedPatient());
		int userId = sessionBean.getLogin().getId();
		try {
			log.info("current user ID from session is "+ userId);
			service.editPatient(getDataModel().getSelectedPatient(), userId);
		} catch (ServiceException e) {
			if(e.getType().equals(ServiceExceptionType.MSG_ERROR_VALIDATION_PATIENT_EXISTS)){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "ERROR", message.getString(ServiceExceptionType.MSG_ERROR_VALIDATION_PATIENT_EXISTS));  
				FacesContext.getCurrentInstance().addMessage(null, msg); 
			}
		
		} catch (SystemException e) {
			//e.printStackTrace();
		}
	}	
	
	/**
	 * 
	 * @param actionEvent
	 */
	public void removeCurrentPatient(ActionEvent actionEvent){
		sessionBean.setCurrentPatient(getDataModel().getSelectedPatient());
		int userId = sessionBean.getLogin().getId();
		try {
			log.info("current user ID from session is "+ userId);
			service.deletePatient(getDataModel().getSelectedPatient().getID_Patient(), userId);
			sessionBean.removeCurrentPatient();
		} catch (ServiceException e) {
			if(e.getType().equals(ServiceExceptionType.MSG_ERROR_DAL_NO_PATIENT_FOUND)){
				FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "ERROR", message.getString(ServiceExceptionType.MSG_ERROR_DAL_NO_PATIENT_FOUND));  
				FacesContext.getCurrentInstance().addMessage(null, msg); 
			}
		
		} catch (SystemException e) {
			//e.printStackTrace();
		}
	}	
	
	public StreamedContent exportPDF(){
		Set<ImageVO> selectedImages = fetchListOfSelectedImages();
		ImageVO[] imageArray = new ImageVO[selectedImages.size()];
		try {
			String path = service.exportPDF(selectedImages.toArray(imageArray));
			FileInputStream fi;
			fi = new FileInputStream(path);
			String filename = "";
			StreamedContent file = new DefaultStreamedContent(fi, MIME_TYPE_PDF, filename);
			return file;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (ServiceException e) {
			e.printStackTrace();
		} catch (SystemException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public StreamedContent exportImages(){
		Set<ImageVO> selectedImages = fetchListOfSelectedImages();
		String fileName = "";  
		if(sessionBean.getCurrentPatient() != null){
			fileName = sessionBean.getCurrentPatient().getFirstName() + "_" + sessionBean.getCurrentPatient().getLastName() + ".zip";
		}
		ImageVO[] imageArray = new ImageVO[selectedImages.size()];
		byte[] zipFile;
		try {
			zipFile = service.exportImage(selectedImages.toArray(imageArray));
			InputStream inputStream = new ByteArrayInputStream(zipFile);
			StreamedContent file = new DefaultStreamedContent(inputStream, MIME_TYPE_ZIP, fileName);
			return file;
		} catch (ServiceException | SystemException e) {
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "ERROR", message.getString(ServiceExceptionType.MSG_ERROR_DAL_NO_IMAGE_FOUND));  
			FacesContext.getCurrentInstance().addMessage(null, msg);
			e.printStackTrace();
		}
		return null;
	}
	
	private Set<ImageVO> fetchListOfSelectedImages(){
		Set<ImageVO> selectedImages = new HashSet<ImageVO>();
		for(ImageVO current : dataModel.getImageList()){
			if(current.isSelected()){
				selectedImages.add(current);
			}
		}
		if(dataModel.getLocationList() != null && dataModel.getLocationList().size() > 0){
			for(LocationVO current : dataModel.getLocationList()){
				if(current.isSelected()){
					try {
						selectedImages.addAll(locationService.getLocationImages(current));
					} catch (ServiceException | SystemException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return selectedImages;
	}
	
	/**
	 * Save Diagnose and Comment for Image
	 * Two steps
	 * 
	 * 1.) save the value in cache list
	 * 2.) save the value in DB Server
	 * 
	 * @param actionEvent
	 */
	public void saveComment(ActionEvent actionEvent){
		log.info("SaveComment");
		
		List<ImageVO> list = dataModel.getImageList();
		
		for(int i=0; i<list.size(); i++){
			ImageVO im = list.get(i);
			if(im.getId()==dataModel.getImage().getId()){
				list.set(i, dataModel.getImage());
			}
		}
		
		try {
			this.locationService.editImage(dataModel.getImage().getId(), dataModel.getImage().getComment(), dataModel.getImage().getDiagnosis(), sessionBean.getLogin().getId());
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "INFO", "Save is done");  
			FacesContext.getCurrentInstance().addMessage(null, msg); 
		} catch (ServiceException | SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "ERROR", "ERROR Type is under develepment.");  
			FacesContext.getCurrentInstance().addMessage(null, msg); 
		}
		
		
	}
}