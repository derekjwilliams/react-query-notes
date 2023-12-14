const User = ({ user }) => {
  return (
    <>
      <div>{user.display_name}</div>
      <div>{user.given_name}</div>
      <div>{user.family_name}</div>
      <div>{user.email}</div>
      <div>{user.employee_id}</div>
    </>
  )
}

export default User
