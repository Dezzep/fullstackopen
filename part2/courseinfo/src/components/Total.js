const Total = ({parts}) => {
  const totalParts = parts.reduce((ttl, part) => ttl + part.exercises, 0) // initial value is 0, targets exercises count.
  return(<p>Number of exercises: {totalParts}</p>)
}

export default Total;