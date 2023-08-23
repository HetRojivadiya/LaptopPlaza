export default function Contact()
{
    return(
        <div className="padding" style={{padding: "35px"}}>
    <div className="container1">
        <div style={{textAlign:"center"}}>
          <h2>Contact Us</h2>
          
        </div>
        <div className="row1">
          <div className="column1">
            <img src="/7.laptop-ecommerce/public/images/contact-us.jpg" style={{height:"80%",width:"90%"}}/>
          </div>
          <div className="column1">
            <form action="/action_page.php">
              <label for="fname">First Name</label>
              <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
              <label for="lname">Last Name</label>
              <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
              <label for="country">Country</label>
              <select id="country" name="country">
                <option value="india"> India</option>
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
              <label for="subject">Subject</label>
              <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"170px"}}></textarea>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}