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
 * Date: 19.06.2013
 * 
 ** This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *  
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *  
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
 * USA
 *  
 *****************************************/
package de.heine.cube.online.component.dataModel;

import java.util.List;

import javax.faces.model.ListDataModel;

import org.primefaces.model.SelectableDataModel;

import de.heine.cube.common.dto.PatientVO;

/**
 * Convert the normal list data model to selectableDateModel.
 * This class is used for selecting patient list in the patient list table. 
 * 
 * @author axu
 * 
 */
public class PatientListDataModel extends ListDataModel<PatientVO> implements
		SelectableDataModel<PatientVO> {

	public PatientListDataModel() {
	}

	public PatientListDataModel(List<PatientVO> data) {
		super(data);
	}

	/**
	 * According to the Rowkey to select the according Patient
	 * 
	 * @see
	 * org.primefaces.model.SelectableDataModel#getRowData(java.lang.String)
	 */
	@Override
	public PatientVO getRowData(String rowKey) {
		List<PatientVO> patientList = (List<PatientVO>) getWrappedData();

		for (PatientVO p : patientList) {
			if ((String.valueOf(p.hashCode())).equals(rowKey))
				return p;
		}

		return null;
	}

	/**
	 * 
	 * 
	 * @see org.primefaces.model.SelectableDataModel#getRowKey(java.lang.Object)
	 */
	@Override
	public Object getRowKey(PatientVO p) {
		return String.valueOf(p.hashCode());
	}

}