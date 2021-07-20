package test.jaxb.field;
 
import javax.xml.bind.annotation.XmlRootElement;
 
// source: http://blog.bdoughan.com/2011/06/jaxb-and-complex-types-with-simple.html
// note that we are not honoring package-info here. Why not?
@XmlRootElement(name="phone-number")
public class PhoneNumber {
 
    private String type;
    private String number;
 
    public String getType() { 
        return type+"(property)";
    }
 
    public void setType(String type) {
        this.type = type;
    }
 
    public String getNumber() {
        return number+"(property)";
    }
 
    public void setNumber(String number) {
        this.number = number;
    }
 
}