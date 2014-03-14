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
import java.util.List;

import de.heine.cube.common.Facing;
import de.heine.cube.common.api.LocationService;
import de.heine.cube.common.dto.ImageVO;
import de.heine.cube.common.dto.LocationVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.SystemException;

/**
 * This class is a mock function for LocationService
 * 
 * @author axu
 * 
 */
public class LocationServiceMock implements LocationService {

	public LocationServiceMock() {

	}

	@Override
	public LocationVO allocateImage(int patientID, int segmentID, int imageID,
			Facing facing, int x_coordinate, int y_coordinate, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		System.out.println("LocationServiceMock.allocate called");
		System.out.println("patiendID: " + patientID);
		System.out.println("segemntID: " + segmentID);
		System.out.println("imageID: " + imageID);
		System.out.println("facing: " + facing);
		System.out.println("x: " + x_coordinate);
		System.out.println("y: " + y_coordinate);
		System.out.println("userID: " + userID);
		
		return null;
	}

	@Override
	public String deleteImage(ImageVO image, LocationVO location)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<ImageVO> getLocationImages(LocationVO location)
			throws ServiceException, SystemException {
		List<ImageVO> list = new ArrayList<ImageVO>();
		ImageVO image1 = new ImageVO();
		image1.setImage("resources/images_temp/testImage1.png");
		image1.setComment("It is a testImage");
		list.add(image1);
		
		ImageVO image2 = new ImageVO();
		image2.setImage("resources/images_temp/1.jpg");
		image2.setComment("This is the first JPG Image");
		list.add(image2);
		
		ImageVO image3 = new ImageVO();
		image3.setImage("resources/images_temp/2.jpg");
		image3.setComment("This is the Second JPG Image");
		list.add(image3);
		
		ImageVO image4 = new ImageVO();
		image4.setImage("resources/images_temp/3.jpg");
		image4.setComment("This is about face");
		list.add(image4);
		
		ImageVO image5 = new ImageVO();
		image5.setImage("resources/images_temp/4.jpg");
		image5.setComment("Just try something");
		list.add(image5);
		
		ImageVO image6 = new ImageVO();
		image6.setImage("resources/images_temp/5.jpg");
		image6.setComment("really do not know what to say");
		list.add(image6);
		
		return list;
	}

	@Override
	public List<LocationVO> getAllLocationsForPatient(int patientID)
			throws ServiceException, SystemException {
		// FIXME logausgabe...
		System.out.println("LocationServiceMock called");
		List<LocationVO> list = new ArrayList<LocationVO>();
		
		LocationVO location = new LocationVO();
		location.setID_Patient(patientID);
		location.setX_Coordinate(50);
		location.setY_Coordinate(50);
		location.setFacing(Facing.left);
		list.add(location);
		
		location = new LocationVO();
		location.setID_Patient(patientID);
		location.setX_Coordinate(173);
		location.setY_Coordinate(66);
		location.setFacing(Facing.front);
		list.add(location);

		location = new LocationVO();
		location.setID_Patient(patientID);
		location.setX_Coordinate(87);
		location.setY_Coordinate(234);
		location.setFacing(Facing.right);
		list.add(location);

		location = new LocationVO();
		location.setID_Patient(patientID);
		location.setX_Coordinate(183);
		location.setY_Coordinate(289);
		location.setFacing(Facing.back);
		list.add(location);
		
		// FIXME logausgabe...
		System.out.println("LocationServiceMock returning: " + list.size() + " locations");
		return list;
	}

	@Override
	public LocationVO disableLocation(int locationID, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LocationVO enableLocation(int locationID, int userID)
			throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ImageVO editImage(int imageID, String Comment, String Diagnosis,
			int userID) throws ServiceException, SystemException {
		// TODO Auto-generated method stub
		return null;
	}

}
