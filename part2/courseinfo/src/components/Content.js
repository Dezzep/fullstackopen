const Content = ({parts}) => {
 
    
    const content = parts.map(el =>  
    <p key={el.name + el.exercises}>{el.name}: {el.exercises}</p> )

    return(
      <>
        {content}
      </>
    )
}
 
export default Content