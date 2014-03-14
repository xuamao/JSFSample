/*****************************************
 * 
 * Project: Cube Application Heine
 * Package Type:
 * Create by: amao.xu@altran.com
 * Date: 21.06.2013
 *
 *****************************************/
package de.heine.cube.online.test;

import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import javax.naming.NamingException;

import org.junit.Test;

/**
 * 
 * @author axu
 * 
 */
public class TestConnection {
	
	
	@Test
	public void testConnectionService() throws NamingException, IOException{
		
		InputStream image1Stream = this.getClass().getClassLoader()
				.getResourceAsStream("testImage1.png");
		
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();

		int nRead;
		byte[] data = new byte[3813];

		while ((nRead = image1Stream.read(data, 0, data.length)) != -1) {
		  buffer.write(data, 0, nRead);
		}

		buffer.flush();

		data = buffer.toByteArray();
		System.out.println(data);
		
		System.out.println();
		
		URL url = new URL("http://localhost:8080/cube-online-module-0.0.1-SNAPSHOT/testImage2.png");
		InputStream is = url.openStream();
		
		byte[] imgDataBa = new byte[3813];
		DataInputStream dataIs = new DataInputStream(is);
		dataIs.readFully(imgDataBa);
		
		System.out.println(imgDataBa);
		
	}
}
