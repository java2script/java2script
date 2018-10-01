package test.jaxb;
 
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
 
// source: http://blog.bdoughan.com/2011/06/jaxb-and-complex-types-with-simple.html
@XmlRootElement(name="phone-number")
public class PhoneNumber {
 
    private String type;
    private String number;
 
    @XmlAttribute
    public String getType() {
        return type;
    }
 
    public void setType(String type) {
        this.type = type;
    }
 
    public String getNumber() {
        return number;
    }
 
    public void setNumber(String number) {
        this.number = number;
    }
 
}