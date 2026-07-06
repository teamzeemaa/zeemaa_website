export default function MissionVisual() {
  return (
    <div className="msvz">
      <div className="msvz-row">
        <div className="msvz-node">
          <div className="msvz-ic"><i className="fas fa-user-plus" /></div>
          <span>Register</span>
        </div>
        <div className="msvz-track"><i className="msvz-dot" /></div>
        <div className="msvz-node">
          <div className="msvz-ic"><i className="fas fa-id-badge" /></div>
          <span>Badge &amp; Check-in</span>
        </div>
        <div className="msvz-track"><i className="msvz-dot" style={{ animationDelay: '1.2s' }} /></div>
        <div className="msvz-node">
          <div className="msvz-ic"><i className="fas fa-check-circle" /></div>
          <span>Live Event</span>
        </div>
      </div>
      <p className="msvz-cap">One team, one platform, managed end to end</p>
    </div>
  );
}
