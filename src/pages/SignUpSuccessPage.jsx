import { Link } from 'react-router-dom';

export default function SignUpSuccessPage() {
  return (
    <div>
      <h1>회원가입 완료</h1>
      <Link to="/login">로그인하기</Link>
    </div>
  );
}
