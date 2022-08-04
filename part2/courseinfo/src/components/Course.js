import Content from "./Content";
import Total from "./Total";

const Course = ({header, parts}) => {
  return ( 
    <div>
      <h2>
        {header}
      </h2>
        <Content parts={parts}/>
        <Total parts={parts}/>
    </div>
   );
}
 
export default Course;