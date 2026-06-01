function UserProfile() {
  return (
    <div className="profile">
      <h1>Hồ sơ cá nhân</h1>
      <img src="photo.jpg" alt="Ảnh đại diện" />
      <table>
        <tbody>
          <tr>
            <td>Họ tên:</td>
            <td>Khang</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>dogiakhanghanoi@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;