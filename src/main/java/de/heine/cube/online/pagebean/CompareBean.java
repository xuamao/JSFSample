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
 * Date: 10.06.2013
 *
 *****************************************/
package de.heine.cube.online.pagebean;

import java.io.IOException;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;

import org.apache.log4j.Logger;

import de.heine.cube.common.api.LocationService;
import de.heine.cube.common.dto.PatientVO;
import de.heine.cube.online.component.AbstractViewScopeBean;

/**
 * Compare Page Bean
 * 
 * <a href="https://cb.heine.com/cb/issue/6428" target="_blank">SRS 6428</a><br/>
 * 
 * @author ALTRAN
 * 
 */
@ManagedBean
@ViewScoped
public class CompareBean extends AbstractViewScopeBean<LocationService>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6855707619823214759L;
	
	private static final Logger log = Logger.getLogger(CompareBean.class.getName());
	
	private PatientVO currentPatient;
	
	private String template="twoViewTemplate.xhtml";
	
	public CompareBean(){
		super(LocationService.class);
		currentPatient = sessionBean.getCurrentPatient();
	}

	/**
	 * @return the currentPatient
	 */
	public PatientVO getCurrentPatient() {
		return currentPatient;
	}
	
	/**
	 * Switch between oneView/twoView/FourView
	 * @return
	 */
	public void compareViewChange(ActionEvent actionEvent){
		try {
			String template = (String) actionEvent.getComponent().getAttributes().get("id");
			FacesContext.getCurrentInstance().getExternalContext().redirect("compare.xhtml?viewTemplate="+template);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @return name of Compare Template
	 */
	public String getTemplate(){
		String tem = (String) context.getExternalContext().getRequestParameterMap().get("viewTemplate");
		log.info(tem);
		if(tem==null)
			return template;
		else
			return tem+".xhtml";
	}
}