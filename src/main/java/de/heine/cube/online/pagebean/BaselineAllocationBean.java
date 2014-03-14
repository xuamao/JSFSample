package de.heine.cube.online.pagebean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import de.heine.cube.common.Facing;
import de.heine.cube.common.api.LocationService;
import de.heine.cube.common.dto.ImageVO;
import de.heine.cube.common.dto.LocationVO;
import de.heine.cube.common.exception.ServiceException;
import de.heine.cube.common.exception.SystemException;
import de.heine.cube.online.component.AbstractViewScopeBean;

@ManagedBean(name = "baselineAllocationBean")
@ViewScoped
public class BaselineAllocationBean extends AbstractViewScopeBean<LocationService> {

	private static final long serialVersionUID = -6892368344902309553L;
	private String imageId;
	private String sector;
	private int x;
	private int y;
	private String facing;

	private ImageVO availableImages[] = fillDummyImages();

	private ImageVO mockImage = null;

	public BaselineAllocationBean() {
		super(LocationService.class);
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	private String firstName;
	private String lastName;

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public String getFacing() {
		return facing;
	}

	public void setFacing(String facing) {
		this.facing = facing;
	}

	public String getImageURL1() {
		if (availableImages != null && availableImages.length > 0) {
			return availableImages[0].getImage();
		} else {
			return getMockImage().getImage();
		}
	}

	public String getImageURL2() {
		if (availableImages != null && availableImages.length > 1) {
			return availableImages[1].getImage();
		} else {
			return getMockImage().getImage();
		}
	}

	public String getImageURL3() {
		if (availableImages != null && availableImages.length > 2) {
			return availableImages[2].getImage();
		} else {
			return getMockImage().getImage();
		}
	}

	public String getImageURL4() {
		if (availableImages != null && availableImages.length > 3) {
			return availableImages[3].getImage();
		} else {
			return getMockImage().getImage();
		}
	}

	public void allocate() {
		System.out.println("allocate was called:");
		System.out.println("imageId: " + imageId);
		System.out.println("sector: " + sector);
		System.out.println("facing: " + facing);
		System.out.println("x: " + x);
		System.out.println("y: " + y);
		System.out.println();

		// FIXME Dummy values
		int patientID = 1;
		int segmentID = 1;
		int userID = 3;

		// PatientService service;
		try {
			System.out.println("allocate using Service: "
					+ service.getClass().getCanonicalName());
			String temp = facing.replace("\"", "");
			temp = temp.replace("'", "");
			Facing f = Facing.valueOf(temp);
			service.allocateImage(patientID, segmentID, 0, f, x, y, userID);

			// InitialContext ctx = new InitialContext();
			// service =
			// (PatientService)ctx.lookup("java:global/CUBE-Web-Processor/PatientServiceBean");
			// PatientVO patient = service.createPatient(lastName, firstName,
			// new Date(), Gender.male.toString());
			// System.out.println("patient created! ID=" +
			// patient.getID_Patient());
		} catch (Exception e) {
			// FIXME Exception Handling
			e.printStackTrace();
		}
	}

	// FIXME ist nur Dummy, kann so nicht bleiben
	private ImageVO getMockImage() {
		if (mockImage == null) {
			mockImage = new ImageVO();
			String url ="/resources/images/imageThumbnailNormal.png";
			mockImage.setImage(url);
		}
		return mockImage;
	}

	// FIXME ist nur Mock, kann so nicht bleiben
	private ImageVO[] fillDummyImages() {
		ImageVO[] images = new ImageVO[5];
		images[0] = new ImageVO();
		images[0].setImage("/resources/images_temp/testImageThumb03.png");
		images[1] = new ImageVO();
		images[1].setImage("/resources/images_temp/testImageThumb04.png");
		images[2] = new ImageVO();
		images[2].setImage("/resources/images_temp/testImageThumb09.png");
		images[3] = new ImageVO();
		images[3].setImage("/resources/images_temp/testImageThumb06.png");
		images[4] = new ImageVO();
		images[4].setImage("/resources/images_temp/testImageThumb07.png");
		
		return images;
	}

	/**
	 * FIXME nur für Testzwecke
	 * 
	 * @return
	 */
	public int getNum() {
		// FIXME festverdrahtet Patient 1
		try {
			return service.getAllLocationsForPatient(1).size();
		} catch (ServiceException e) {
			e.printStackTrace();
			return -1;
		} catch (SystemException e) {
			e.printStackTrace();
			return -2;
		} catch (Exception e) {
			e.printStackTrace();
			return -3;
		}
	}

	public String getNums() {
		return "[17,2,5,3]";
	}
	
	public String getLocationsJSON() {
		LocationVO[] dummies = new LocationVO[4];
		LocationVO dummy = new LocationVO();
		dummy.setX_Coordinate(0);
		dummy.setY_Coordinate(0);
		dummies[0]=dummy;
		dummy = new LocationVO();
		dummy.setX_Coordinate(100);
		dummy.setY_Coordinate(100);
		dummies[1]=dummy;
		dummy = new LocationVO();
		dummy.setX_Coordinate(100);
		dummy.setY_Coordinate(0);
		dummies[2]=dummy;
		dummy = new LocationVO();
		dummy.setX_Coordinate(0);
		dummy.setY_Coordinate(100);
		dummies[3]=dummy;
		
		return locArrayToJSON(dummies);
	}

	public String locToJSON(LocationVO loc) {
		return "{ \"x\":" + loc.getX_Coordinate() + ", \"y\":" + loc.getY_Coordinate()
				+ "}";
	}
	public String locArrayToJSON(LocationVO[] locs) {
		StringBuffer json = new StringBuffer("[");
		boolean first = true;
		if (locs != null) {
			for (LocationVO loc:locs) {
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
