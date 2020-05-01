package test;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class CrossOriginRequestComPADRE {

	public static void main(String[] args) {
		
		System.out.println(
				"https://www.compadre.org/osp/services/REST/osp_tracker.cfm?OSPType=Tracker&OSPPrimary=Subject&OSPSubject=225&OSPSubjectDetail=248&OSPSubjectDetailDetail=1049");
		try {
			URL u = new URL("https://www.compadre.org/osp/services/REST/osp_tracker.cfm?OSPType=Tracker&OSPPrimary=Subject&OSPSubject=225&OSPSubjectDetail=248&OSPSubjectDetailDetail=1049");
			URLConnection uc = u.openConnection();
			Map<String, List<String>> fields = uc.getHeaderFields();
			System.out.println("URLConnection=\n\t"+uc);
			System.out.println("Header Fields n="+fields.size());
			for (Entry<String, List<String>> e : fields.entrySet()) {
				String key = e.getKey();
				List<String> list = e.getValue();
				System.out.println(key + "  " + list);
			}
		} catch (IOException e) {
			e.getStackTrace();
		}
		
		System.out.println(
				"\nhttps://www.compadre.org/profiles/bubble.jpg");
		try {
			URL u = new URL("https://www.compadre.org/profiles/bubble.jpg");
			URLConnection uc = u.openConnection();
			Map<String, List<String>> fields = uc.getHeaderFields();
			System.out.println("URLConnection=\n\t"+uc);
			System.out.println("Header Fields n="+fields.size());
			for (Entry<String, List<String>> e : fields.entrySet()) {
				String key = e.getKey();
				List<String> list = e.getValue();
				System.out.println(key + "  " + list);
			}
		} catch (IOException e) {
			e.getStackTrace();
		}
		

	}

}
