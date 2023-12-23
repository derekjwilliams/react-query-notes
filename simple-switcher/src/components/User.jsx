const User = ({ user, index, handleVote }) => {
  return (
    <div className='surface-4 rad-shadow'>
      <h5>{user.display_name}</h5>
      <div>{user.given_name}</div>
      <div>{user.family_name}</div>
      <div>{user.email}</div>
      <div>{user.employee_id}</div>
    </div>
  )
}

export default User
