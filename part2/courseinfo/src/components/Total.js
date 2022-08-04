const Total = ({parts}) => {
  const totalParts = parts.reduce((ttl, part) => ttl + part.exercises, 0) // initial value is 0, targets exercises count.
  return(<h4>Total of {totalParts} exercises: </h4>)
}

export default Total;