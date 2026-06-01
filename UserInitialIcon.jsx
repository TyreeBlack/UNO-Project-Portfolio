

function UserInitialIcon({username, className="username_icon"}) {
  const initial = username ? username[0].toUpperCase() : '?';

  return (
    <div className={`username_icon ${className}`}>
    <h6 className="username_initial">{initial}</h6>
    </div>
  );
}

export default UserInitialIcon