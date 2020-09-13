import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const EventRegistration = (props) => {
  return (
    <Auxiliary>
      <div id="bg"></div>
  
<form action="" method="POST">
  <h1> Event Registration</h1>

  
    <label for=""></label>
    <i class="fa fa-user"></i>
  <input type="text" name="" id="" placeholder="Your name" class="name">
     
  <label for=""></label>
  <input type="text" name="" id="" placeholder="email" class="email">
    
  <label for=""></label>
  <input type="text" name="" id="" placeholder="Phone number" class="phone-number">
  
  
  
  
  
                    <label class="ticket">TICKET</label>
                    <select>
                      <option defaultValue>--Select--</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  
    
  <button type="submit">Register Now</button>
    
</form>
  
  </div>
      </div>
    </Auxiliary>
  );
};

export default EventRegistration;
