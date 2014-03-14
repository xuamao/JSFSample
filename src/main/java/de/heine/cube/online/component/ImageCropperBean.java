package de.heine.cube.online.component;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.imageio.stream.FileImageOutputStream;
import javax.servlet.ServletContext;

import org.primefaces.model.CroppedImage;

@ManagedBean
@SessionScoped
public class ImageCropperBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2908777213135227826L;

	private CroppedImage croppedImage;

	private String newImageName;

	private int width;
	private int height;
	static int zoom = 0;

	public CroppedImage getCroppedImage() {
		return croppedImage;
	}

	public void setCroppedImage(CroppedImage croppedImage) {
		this.croppedImage = croppedImage;
		width = this.croppedImage.getWidth();
		height = this.croppedImage.getHeight();
	}

	public String add() {
		zoom = zoom + 1;
		width = zoom + width;
		height = zoom + height;
		return crop();
	}

	public String reduce() {
		zoom = zoom - 1;
		width = zoom + width;
		height = zoom + height;
		return crop();
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String crop() {

		if (croppedImage == null)
			return null;
		
		System.out.println("Top"+croppedImage.getTop());
		System.out.println("Left"+croppedImage.getLeft());
		System.out.println("Height"+croppedImage.getHeight());
		System.out.println("Width"+croppedImage.getWidth());

		setNewImageName(getRandomImageName());
		ServletContext servletContext = (ServletContext) FacesContext
				.getCurrentInstance().getExternalContext().getContext();
		String newFileName = servletContext.getRealPath("") + File.separator
				+ "images" + File.separator + "barca" + File.separator
				+ getNewImageName() + ".jpg";

		FileImageOutputStream imageOutput;
		try {
			imageOutput = new FileImageOutputStream(new File(newFileName));

			imageOutput.write(croppedImage.getBytes(), 0,
					croppedImage.getBytes().length);
			imageOutput.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	private String getRandomImageName() {
		int i = (int) (Math.random() * 100000);

		return String.valueOf(i);
	}

	public String getNewImageName() {
		return newImageName;
	}

	public void setNewImageName(String newImageName) {
		this.newImageName = newImageName;
	}
}
